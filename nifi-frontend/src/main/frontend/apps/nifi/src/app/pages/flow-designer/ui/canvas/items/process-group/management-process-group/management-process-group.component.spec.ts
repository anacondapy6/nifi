import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagementProcessGroupComponent } from './management-process-group.component';

describe('ManagementProcessGroupComponent', () => {
    let component: ManagementProcessGroupComponent;
    let fixture: ComponentFixture<ManagementProcessGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ManagementProcessGroupComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ManagementProcessGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
