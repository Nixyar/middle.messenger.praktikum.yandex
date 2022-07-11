import Block from '../../../core/Block';
import './link.css';
import { Router } from '../../../core';

interface LinkProps {
    text: string;
    to: string;
}

export class Link extends Block {
    constructor(props: LinkProps) {
        const onClick = (e: MouseEvent) => {
            e.preventDefault();
            const router = new Router();
            router.go(this.props.to);
        };
        super({ ...props, events: {click: onClick} });
    }

    render() {
        // language=hbs
        return `<a class="p1" href={{to}}>{{text}}</a>`;
    }
}
