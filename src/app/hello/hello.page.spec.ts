import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelloPage } from './hello.page';

describe('HelloPage', () => {
  let component: HelloPage;
  let fixture: ComponentFixture<HelloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
