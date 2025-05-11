"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.TrainingService = void 0;
var rxjs_1 = require("rxjs");
var TrainingService = /** @class */ (function () {
    function TrainingService() {
        this.exerciseChanged = new rxjs_1.Subject();
        this.availableExercises = [
            { id: 'crunches', name: 'کرانچ', duration: 30, calories: 8 },
            { id: 'squat', name: 'اسکوات', duration: 180, calories: 15 },
            { id: 'side-lunges', name: 'لانچ اسکوات', duration: 120, calories: 18 },
            { id: 'burpees', name: 'شنا', duration: 60, calories: 8 },
        ];
        this.exercises = [];
    }
    TrainingService.prototype.getAvailableExercises = function () {
        return this.availableExercises.slice();
    };
    TrainingService.prototype.startExercise = function (selectedId) {
        this.runningExercise = this.availableExercises.find(function (ex) { return ex.id === selectedId; });
        this.exerciseChanged.next(__assign({}, this.runningExercise));
    };
    TrainingService.prototype.getRunningExercise = function () {
        return __assign({}, this.runningExercise);
    };
    TrainingService.prototype.completeExercise = function () {
        this.exercises.push(__assign(__assign({}, this.runningExercise), { date: new Date(), state: 'completed' }));
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    };
    TrainingService.prototype.cancelExercise = function (progress) {
        var _a, _b;
        this.exercises.push(__assign(__assign({}, this.runningExercise), { date: new Date(), state: 'canceled', duration: ((_a = this.runningExercise) === null || _a === void 0 ? void 0 : _a.duration) * (progress / 100), calories: ((_b = this.runningExercise) === null || _b === void 0 ? void 0 : _b.duration) * (progress / 100) }));
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    };
    return TrainingService;
}());
exports.TrainingService = TrainingService;
