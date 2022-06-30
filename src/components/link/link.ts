import Block from '../../../core/Block';
import './link.css';

interface LinkProps {
    text: string;
    linkTo?: string;
    linkToFunc?: () => void;
}

export class Link extends Block<any> {
    constructor({text, linkTo, linkToFunc}: LinkProps) {
        super({text, linkTo, events: {click: linkToFunc}});
    }

    protected render(): string {
        // language=hbs
        return `
            <a class="p1" {{#if linkTo}}href="{{linkTo}}"{{/if}}>{{text}}</a>
        `;
    }
}
