import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGraphComponent } from './home-graph.component';

describe('HomeGraphComponent', () => {
  let component: HomeGraphComponent;
  let fixture: ComponentFixture<HomeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
