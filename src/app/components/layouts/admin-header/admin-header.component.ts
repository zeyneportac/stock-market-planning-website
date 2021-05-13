import { Component, OnInit } from '@angular/core';
import { LanguageService, AuthService } from '../../../utils';
import { PasswordChangeComponent } from '../../password-change/password-change.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private _languageService: LanguageService,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) {}

  userInformation = this._authService.currentUserValue.result;
  lang: string =
    this._languageService.getLanguage() == 'en'
      ? 'us'
      : this._languageService.getLanguage() || 'tr';
  ngOnInit(): void {}

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
