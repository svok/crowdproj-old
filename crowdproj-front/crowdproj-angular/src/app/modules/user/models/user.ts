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

export class User {
    id: string;
    email: string;
    status_id: number;
    type_id: number;
    fname: string;
    mname: string;
    lname: string;
    bdate: string;

    getName(): string {
        let names = [];
        if(this.fname) names.push(this.fname);
        if(this.mname) names.push(this.mname);
        if(this.lname) names.push(this.lname);

        let nameStr: string = names.join(" ")

        return nameStr ? nameStr : this.email;
    }

    import(dat: any): User {
        if(typeof dat == "string") {
            dat = JSON.parse(dat);
        }

        if(dat['id']) this.id = dat['id'];
        if(dat['email']) this.email = dat['email'];
        if(dat['status_id']) this.status_id = dat['status_id'];
        if(dat['type_id']) this.type_id = dat['type_id'];
        if(dat['fname']) this.fname = dat['fname'];
        if(dat['mname']) this.mname = dat['mname'];
        if(dat['lname']) this.lname = dat['lname'];
        if(dat['bdate']) this.bdate = dat['bdate'];

        return this;
    }

    export() {
        return JSON.stringify({
            id: this.id,
            email: this.email,
            status_id: this.status_id,
            type_id: this.type_id,
            fname: this.fname,
            mname: this.mname,
            lname: this.lname,
            bdate: this.bdate
        });
    }
}
