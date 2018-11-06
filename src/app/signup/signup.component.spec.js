import { Observable } from 'rxjs/Observable';
import SignupModule from './signup';

describe("SignupComponent", () => {
  let $componentController, ctrl, spySignupService;
  beforeEach(angular.mock.module(SignupModule));

  beforeEach(angular.mock.inject(($injector) => {
    $componentController = $injector.get("$componentController");
    ctrl = $componentController("signup", null, null);
  }));

  beforeEach(() => {
    spySignupService = spyOn(ctrl.signupService, "signup").and.returnValue(Observable.of({ message: "Poprawnie założono konto. Możesz się teraz zalogować." }));
    spyOn(ctrl.alertEventService, "showSuccessAlert");
    spyOn(ctrl.alertEventService, "showDangerAlert");
  });

  it("should initialize services and user model object", () => {
    expect(ctrl.alertEventService).toBeDefined();
    expect(ctrl.signupService).toBeDefined();
    expect(ctrl.user).toBeDefined();
  });

  it('should call signupService signup method', () => {
    expect(ctrl.signupService.signup).not.toHaveBeenCalled();
    ctrl.user = { name: "John", surname: "Doe", email: "john@test.com" };
    ctrl.signup();
    expect(ctrl.signupService.signup).toHaveBeenCalledWith(ctrl.user);
  });

  it('should call alertEventService.showSuccessAlert', () => {
    expect(ctrl.alertEventService.showSuccessAlert).not.toHaveBeenCalled();
    ctrl.signup();
    expect(ctrl.alertEventService.showSuccessAlert).toHaveBeenCalled();
    expect(ctrl.alertEventService.showSuccessAlert.calls.argsFor(0)).toEqual(["Poprawnie założono konto. Możesz się teraz zalogować."]);
  });

  it('should call alertEventService.showDangerAlert', () => {
    const err = { data: { message: "Error" } };
    spySignupService.and.returnValue(Observable.throw(err));
    expect(ctrl.alertEventService.showDangerAlert).not.toHaveBeenCalled();
    ctrl.signup();
    expect(ctrl.alertEventService.showDangerAlert).toHaveBeenCalledWith("Error");
  });

  describe("when signup component is compiled manually", () => {

    let element, ctrl, scope, $rootScope, $compile;

    beforeEach(angular.mock.inject(($injector) => {
      $rootScope = $injector.get("$rootScope");
      $compile = $injector.get("$compile");
    }));

    beforeEach(() => {
      scope = $rootScope.$new();
      element = $compile("<signup></signup>")(scope);
      ctrl = element.controller("signup");
      scope.$apply();
    });

    it("should show error message when name field is touched and empty", () => {
      const nameFormGroup = element.find("form").children().eq(0);

      expect(ctrl.user.name).not.toBeDefined();
      expect(nameFormGroup.hasClass("has-error")).toBe(false);
      expect(nameFormGroup.find(".help-block").length).toBe(0);

      const nameInput = nameFormGroup.find("input");
      nameInput.val("John").triggerHandler("input");
      nameInput.val("").triggerHandler("input");
      scope.$apply();

      expect(ctrl.user.name).toBe(undefined);
      expect(nameFormGroup.hasClass("has-error")).toBe(true);
      expect(nameFormGroup.find(".help-block").text()).toContain("Musisz wprowadzić swoje imię.");
    });

    it("should show error message when email is not valid", () => {
      const emailFormGroup = element.find("form").children().eq(2);

      expect(ctrl.user.email).not.toBeDefined();
      expect(emailFormGroup.hasClass("has-error")).toBe(false);
      expect(emailFormGroup.find(".help-block").length).toBe(0);

      emailFormGroup.find("input").val("john@").triggerHandler("input");
      scope.$apply();

      expect(emailFormGroup.hasClass("has-error")).toBe(true);
      expect(emailFormGroup.find(".help-block").text()).toContain("Adres e-mail jest niepoprawny.");
    });

    it("should set valid email", () => {
      const emailFormGroup = element.find("form").children().eq(2);

      expect(ctrl.user.email).not.toBeDefined();

      emailFormGroup.find("input").val("john@test.com").triggerHandler("input");
      scope.$apply();

      expect(ctrl.user.email).toBe("john@test.com");
      expect(emailFormGroup.hasClass("has-error")).toBe(false);
      expect(emailFormGroup.find(".help-block").length).toBe(0);
    });

    it("should diasable submit btn", () => {
      expect(element.find("button").attr("disabled")).toBe("disabled");
    });

    it("should enable submit btn", () => {
      ctrl.user = {
        name: "John",
        surname: "Doe",
        email: "john@test.com",
        password: "password123",
        confirmPassword: "password123"
      };
      scope.$apply();

      expect(element.find("button").attr("disabled")).toBe(undefined);
    });

    it("should call signup method when form is submitted", () => {
      ctrl.user = {
        name: "John",
        surname: "Doe",
        email: "john@test.com",
        password: "password123",
        confirmPassword: "password123"
      };
      spyOn(ctrl, "signup");
      expect(ctrl.signup).not.toHaveBeenCalled();

      element.find("form").triggerHandler("submit");
      scope.$apply();

      expect(ctrl.signup).toHaveBeenCalled();
    });

    describe("for password inputs", () => {

      let passwordFormGroup, confirmPasswordFormGroup;

      beforeEach(() => {
        passwordFormGroup = element.find("form").children().eq(3),
          confirmPasswordFormGroup = element.find("form").children().eq(4);
      });

      it("should show error message when password is not valid", () => {
        expect(ctrl.user.password).not.toBeDefined();
        expect(passwordFormGroup.hasClass("has-error")).toBe(false);
        expect(passwordFormGroup.find(".help-block").length).toBe(0);

        passwordFormGroup.find("input").val("password").triggerHandler("input");
        scope.$apply();

        expect(passwordFormGroup.hasClass("has-error")).toBe(true);
        expect(passwordFormGroup.find(".help-block").text()).toContain("Hasło musi składać z conajmniej 8 znaków i zawierać przynajmniej jedną cyfrę.");
      });

      it("should not show any error message when passwords match", () => {
        const password = "password1234";

        expect(confirmPasswordFormGroup.hasClass("has-error")).toBe(false);
        expect(confirmPasswordFormGroup.find(".help-block").length).toBe(0);

        passwordFormGroup.find("input").val(password).triggerHandler("input");
        confirmPasswordFormGroup.find("input").val(password).triggerHandler("input");
        scope.$apply();

        expect(ctrl.user.password).toEqual(password);
        expect(ctrl.user.confirmPassword).toEqual(password);
        expect(confirmPasswordFormGroup.hasClass("has-error")).toBe(false);
        expect(confirmPasswordFormGroup.find(".help-block").length).toBe(0);
      });

      it("should show error message when confirmPassword != password", () => {
        expect(confirmPasswordFormGroup.hasClass("has-error")).toBe(false);
        expect(confirmPasswordFormGroup.find(".help-block").length).toBe(0);

        passwordFormGroup.find("input").val("password1").triggerHandler("input");
        confirmPasswordFormGroup.find("input").val("password2").triggerHandler("input");
        scope.$apply();

        expect(confirmPasswordFormGroup.hasClass("has-error")).toBe(true);
        expect(confirmPasswordFormGroup.find(".help-block").text()).toContain("Hasła muszą być takie same.");
      });
    });
  });
});


