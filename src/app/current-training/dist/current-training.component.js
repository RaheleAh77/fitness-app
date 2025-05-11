"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CurrentTrainingComponent = void 0;
var core_1 = require("@angular/core");
var stop_training_modal_component_1 = require("./stop-training-modal/stop-training-modal.component");
var CurrentTrainingComponent = /** @class */ (function () {
    function CurrentTrainingComponent(dialog, trainingService) {
        this.dialog = dialog;
        this.trainingService = trainingService;
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 0;
    }
    CurrentTrainingComponent.prototype.ngOnInit = function () {
        this.startOrResumeTraining();
    };
    CurrentTrainingComponent.prototype.startOrResumeTraining = function () {
        var _this = this;
        var increment = (this.trainingService.getRunningExercise().duration / 100) * 1000;
        this.timer = setInterval(function () {
            _this.value += 1;
            if (_this.value >= 100) {
                _this.trainingService.completeExercise();
                clearInterval(_this.timer);
            }
        }, increment);
    };
    CurrentTrainingComponent.prototype.onStop = function () {
        var _this = this;
        clearInterval(this.timer);
        var dialogRef = this.dialog.open(stop_training_modal_component_1.StopTrainingModalComponent, {
            data: { value: this.value }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.trainingService.cancelExercise(_this.value);
            }
            else {
                _this.startOrResumeTraining();
            }
        });
    };
    CurrentTrainingComponent = __decorate([
        core_1.Component({
            selector: 'app-current-training',
            templateUrl: './current-training.component.html',
            styleUrls: ['./current-training.component.css']
        })
    ], CurrentTrainingComponent);
    return CurrentTrainingComponent;
}());
exports.CurrentTrainingComponent = CurrentTrainingComponent;
