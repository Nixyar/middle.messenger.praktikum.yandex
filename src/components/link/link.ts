import Block from '../../../core/Block';
import './link.css';

interface LinkProps {
    text: string;
    to: string;
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super({ ...props });
    }

    render() {
        // language=hbs
        return `<a class="p1" href={{linkTo}}>{{text}}</a>`;
    }
}
