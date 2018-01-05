
export class Message {
    static MESSAGE_TYPE_INFO = 1;
    static MESSAGE_TYPE_WARNING = 2;
    static MESSAGE_TYPE_ERROR = 3;
    static MESSAGE_TYPE_ALERT = 4;
    static MESSAGE_TYPE_DEBUG = 10;

    static messageTypesMap: { [key: number]: string; } = {
        [Message.MESSAGE_TYPE_ERROR]: 'error',
        [Message.MESSAGE_TYPE_ALERT]: 'alert',
        [Message.MESSAGE_TYPE_WARNING]: 'warning',
        [Message.MESSAGE_TYPE_INFO]: '',
        [Message.MESSAGE_TYPE_DEBUG]: '',
    };

    id?: number;
    type: number;
    title: string;
    text: string;
}

