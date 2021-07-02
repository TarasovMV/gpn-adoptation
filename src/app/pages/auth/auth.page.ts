import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../core/services/data/user.service";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    @ViewChild('input') codeInput: ElementRef;

    public readonly codeControl: FormControl =
        new FormControl('', [Validators.required, Validators.minLength(5)]);
    public readonly isSwingAnimation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private userService: UserService) {}

    public ngOnInit(): void {
        this.codeControl.valueChanges.subscribe(x => {
            if (!this.codeControl.valid) {
                return;
            }
            this.auth(x).then();
        });
    }

    private async auth(code: string): Promise<void> {
        this.codeInput.nativeElement.blur();
        this.isSwingAnimation$.next(false);
        try {
            await this.userService.login(code);
        } catch (e) {
            this.isSwingAnimation$.next(true);
        }
    }

}
