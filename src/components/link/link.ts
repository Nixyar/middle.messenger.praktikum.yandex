import Block from '../../../core/Block';
import './link.css';
// import BrowseRouter from '../../../core/BrowserRouter';

interface LinkProps {
    text: string;
    to: string;
}

export class Link extends Block {
    constructor(props: LinkProps) {
        const onClick = () => {
            // e.preventDefault();
            // const router = new BrowseRouter();
            // router.go(this.props.to);
        };
        super({ ...props, events: {click: onClick} });
    }

    render() {
        // language=hbs
        return `<a class="p1" href={{to}}>{{text}}</a>`;
    }
}
