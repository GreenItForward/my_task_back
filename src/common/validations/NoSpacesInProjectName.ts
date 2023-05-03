import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'noSpacesInProjectName', async: false })
class NoSpacesInProjectName implements ValidatorConstraintInterface {
  validate(value: string) {
    return !/\s/.test(value);
  }

  defaultMessage() {
    return 'The project name must not contain spaces';
  }
}


export default NoSpacesInProjectName;