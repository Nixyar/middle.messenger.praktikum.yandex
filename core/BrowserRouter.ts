import renderDOM from "./renderDOM";
import Block, {BlockClass} from '../core/Block';

type props = Record<string, any>;

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

class Route <P = any>{
    #pathname: string;
    #blockClass: BlockClass<P>;
    #block: Block | null = null;
    #props: props;
    #isPrefixId: boolean | undefined

    constructor(pathname: string, view: BlockClass<P>, props: props) {
        this.#isPrefixId = pathname.includes(':id')
        this.#pathname = pathname.replace('/:id', '');
        this.#blockClass = view;
        this.#props = props;
    }
    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.render();
        }
    }
    leave() {
        if (this.#block) {
            this.#block.dispatchComponentWillUnmount();
        }
    }
    match(pathname: string) {
        if (this.#isPrefixId) {
            pathname = pathname.replace(/\/\d+/, '');
        }
        return isEqual(pathname, this.#pathname);
    }
    render() {
        // @ts-ignore
        this.#block = new this.#blockClass({...this.#props});
        renderDOM(this.#block)
    }
}


export default class BrowseRouter {
    static __instance: BrowseRouter;
    #routers: Array<Route> = [];
    #history: History = window.history;
    #currentRoute: Route | null = null;

    constructor() {
        if (BrowseRouter.__instance) {
            return BrowseRouter.__instance;
        }

        BrowseRouter.__instance = this;
    }

    use<P>(pathname: string, block: BlockClass<P>, props: props = {}) {
        const route = new Route(pathname, block, props);

        this.#routers.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event) => {
            // @ts-ignore
            this._onRoute(event.currentTarget?.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this.#currentRoute && this.#currentRoute !== route) {
            this.#currentRoute.leave();
        }

        this.#currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.#history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.#history.back();
    }

    forward() {
        this.#history.forward();
    }

    getRoute(pathname:string): Route | undefined {
        const router = this.#routers.find(route => route.match(pathname));
        return router || this.#routers.find(route => route.match('*'));
    }
}
