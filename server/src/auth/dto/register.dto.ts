
import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Пожалуйста, укажите корректный email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(32, { message: 'Пароль должен содержать максимум 32 символа' })
  @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, { 
    message: 'Пароль должен содержать хотя бы одну букву и одну цифру' 
  })
  password: string;
}