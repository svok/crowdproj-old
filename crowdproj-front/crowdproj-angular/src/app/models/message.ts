/**
 *
 * Copyright © 2017 Sergey Okatov. All rights reserved.
 * Author: Sergey Okatov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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

