import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IScontriniRetrieverConfigToken } from './services/interfaces/scontrini-retriever';
import { ScontriniMockService } from './services/scontrini-mock/scontrini-mock.service';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge/badge.component';
import { APP_BASE_HREF } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BadgeComponent,
        TopbarComponent
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
