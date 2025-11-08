// import { toResponseUserDto } from 'src/modules/user/mappers/user.mapper';
// import { ResponsePrescriptorDto } from '../DTOs/response.prescriptor.dto';
// import { PrescriptorEntity } from '../entities/prescriptor.entity';

// export function toResponsePrescriptorDto(
//   prescriptor: PrescriptorEntity,
// ): ResponsePrescriptorDto {
//   const responseDto = new ResponsePrescriptorDto();

//   responseDto.id = prescriptor.id;
//   responseDto.name = prescriptor.name;
//   responseDto.registrationNumber = prescriptor.registrationNumber;
//   responseDto.speciality = prescriptor.specialty ? prescriptor.specialty : null;
//   responseDto.advice = prescriptor.advice;
//   responseDto.status = prescriptor.status;
//   responseDto.createdAt = prescriptor.createdAt;
//   responseDto.updatedAt = prescriptor.updatedAt;
//   responseDto.userCreated = prescriptor.userCreated
//     ? toResponseUserDto(prescriptor.userCreated)
//     : null;
//   responseDto.userUpdated = prescriptor.userUpdated
//     ? toResponseUserDto(prescriptor.userUpdated)
//     : null;

//   return responseDto;
// }
