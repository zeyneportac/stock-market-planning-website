import { Component, OnInit } from '@angular/core';
import { LanguageService, AuthService, UserService } from '../../../utils';
import { MatDialog } from '@angular/material/dialog';
import { Balance, User } from '../../../models';
import {
  PasswordChangeComponent,
  AddBalanceComponent,
} from '../../../components';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private _languageService: LanguageService,
    private _userService: UserService,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) {}
  user: User = new User();
  balanceList: Array<Balance>;

  async ngOnInit() {
    const currentUser = this._authService.currentUserValue();
    this.user = <User>await this._userService.findAsync(currentUser.Id);
    console.log(' this.user', this.user);
  }

  openAddBalance(Id = null) {
    const diologRef = this._dialog.open(AddBalanceComponent, {
      width: '400px',
      data:
        Id == null
          ? null
          : this.balanceList.find((balance) => balance.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
  userInformation = this._authService.currentUserValue.result;
  lang: string =
    this._languageService.getLanguage() == 'en'
      ? 'us'
      : this._languageService.getLanguage() || 'tr';

  setLang(lang: string) {
    this.lang = lang == 'en' ? 'us' : lang;
    this._languageService.setLanguage(lang);
  }

  async signout() {
    await this._authService.logout();
  }

  openPasswordChangeWindow() {
    this._dialog.open(PasswordChangeComponent, {
      width: '400px',
    });
  }
}
