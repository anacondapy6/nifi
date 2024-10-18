import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonCreateProjectComponent } from './common-create-project.component';

describe('CommonCreateProjectComponent', () => {
    let component: CommonCreateProjectComponent;
    let fixture: ComponentFixture<CommonCreateProjectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonCreateProjectComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CommonCreateProjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
