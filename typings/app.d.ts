declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type Indexed = { [key: string]: any };

    export type AppState = {
        appInitialization: boolean;
        isLoading: boolean;
        user: User | null;
    };

    export type User = {
        id: number;
        login: string;
        firstName: string;
        secondName: string;
        displayName: string;
        avatar: string;
        phone: string;
        email: string;
    };

    export interface UserInfo {
        "id": number,
        "first_name": string,
        "second_name": string,
        "display_name": string,
        "login": string,
        "email": string,
        "phone": string,
        "avatar": string
    }

    export interface ChatItem {
        "id": number;
        "title": string;
        "avatar": string;
        "unread_count": number;
        "last_message": {
            "user": {
                "first_name": string;
                "second_name": string;
                "avatar": string;
                "email": string;
                "login": string;
                "phone": string;
            },
            "time": string;
            "content": string;
        }
    }
}

export {};
