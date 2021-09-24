import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../core/services/data/user.service";
import {BehaviorSubject} from "rxjs";
import {StatusBarService} from "../../core/services/platform/status-bar.service";
import {NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, AfterViewInit {
    @ViewChild('input') codeInput: ElementRef;
    public isInputFocused: boolean;

    public readonly codeControl: FormControl =
        new FormControl('', [Validators.required, Validators.minLength(5)]);
    public readonly isSwingAnimation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private userService: UserService,
        private statusBarService: StatusBarService
    ) {
    }

    public ngOnInit(): void {
        this.codeControl.valueChanges.subscribe(x => {
            if (!this.codeControl.valid) {
                return;
            }
            this.auth(x).then();
        });
    }

    public ngAfterViewInit(): void {
        this.statusBarService.setAlternativeColor();
        setTimeout(()=> {
            this.statusBarService.setDefaultColor();
        }, 10);
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

    // eslint-disable-next-line @typescript-eslint/member-ordering
    onInputFocused(): void {
        setTimeout(()=> {
            this.isInputFocused = true;
        }, 0);
    }

    onInputBlured(): void {
        setTimeout(()=> {
            this.isInputFocused = false;
        }, 50);
    }
}
