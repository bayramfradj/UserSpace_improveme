import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCandidaturesByUserComponent } from './all-candidatures-by-user.component';

describe('AllCandidaturesByUserComponent', () => {
  let component: AllCandidaturesByUserComponent;
  let fixture: ComponentFixture<AllCandidaturesByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCandidaturesByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCandidaturesByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
