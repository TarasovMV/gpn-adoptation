import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../core/services/data/user.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    public readonly codeControl: FormControl =
        new FormControl('', [Validators.required, Validators.minLength(5)]);

    constructor(private userService: UserService) {}

    public ngOnInit(): void {
        this.codeControl.valueChanges.subscribe(x => {
            if (!this.codeControl.valid) {
                return;
            }
            this.auth(x).then();
        })
    }

    private async auth(code: string): Promise<void> {
        await this.userService.login(code);
    }

}
