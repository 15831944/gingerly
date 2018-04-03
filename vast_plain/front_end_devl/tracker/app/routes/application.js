import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    flash(data) {
      this.controller.set('alertMessage', data.message);
      this.controller.set('alertType', data.alertType);
      this.controller.set('isAlertShowing', true);
    }
  }
});
