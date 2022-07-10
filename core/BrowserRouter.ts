import Block, {BlockClass} from "./Block";
import renderDOM from "./renderDOM";

type props = Record<string, any>

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export class Route<Props = any> {
    #pathname: string;
    #block: Block<Props> | null = null;
    readonly #blockClass: BlockClass<Props>;
    readonly #props: Props;

    constructor(pathname: string, view: BlockClass<Props>, props: Props) {
        this.#pathname = pathname;
        this.#blockClass = view;
        this.#props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.#pathname = pathname;
            this.render();
        }
    }

    leave() {
        // if (this.#block) {
        //     this.#block.hide();
        // }
    }

    match(pathname: string) {
        return isEqual(pathname, this.#pathname);
    }

    render() {
        if (!this.#block) {
            this.#block = new this.#blockClass(this.#props);
            renderDOM(this.#block);
        }

        // this.#block.show();
    }
}

export default class Router {
    static _instance: Router;
    #routers: Array<Route> = [];
    #history: History = window.history;
    #currentRoute: Route | undefined;

    constructor() {
        if (Router._instance) {
            return Router._instance;
        }
        Router._instance = this;
    }

    use<Props>(pathname: string, block: BlockClass<Props>, props: props = {}) {
        // @ts-ignore
        const route = new Route(pathname, block, props);
        this.#routers.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
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

        if (this.#currentRoute) {
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

    getRoute(pathname: string): Route | undefined {
        const router = this.#routers.find(route => route.match(pathname));
        return router || this.#routers.find(route => route.match('*'));
    }
}
