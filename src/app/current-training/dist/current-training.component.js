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
    function CurrentTrainingComponent(dialog) {
        this.dialog = dialog;
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 0;
    }
    CurrentTrainingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.timer = setInterval(function () {
            _this.value += 5;
            if (_this.value >= 100) {
                clearInterval(_this.timer);
            }
        }, 1000);
    };
    CurrentTrainingComponent.prototype.onStop = function () {
        clearInterval(this.timer);
        this.dialog.open(stop_training_modal_component_1.StopTrainingModalComponent);
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
