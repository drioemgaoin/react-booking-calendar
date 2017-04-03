export function Authorization() {
    return function decorator(target) {
        target.prototype.isPermitted = function(role: string) {
            return true;
        };
    };
}
