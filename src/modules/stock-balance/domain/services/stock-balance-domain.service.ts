import { Injectable } from '@nestjs/common';
import { StockBalanceEntity } from '../entities/stock-balance.entity';
import { StockBalanceNotFoundException } from '../exceptions/stock-balance-not-found.exception';
import { StockBalanceAlreadyExistsException } from '../exceptions/stock-balance-already-exists.exception';
import { StockBalanceInsufficientBalanceException } from '../exceptions/stock-balance-insufficient-balance.exception';
import { StockBalanceOperationType } from '../enums/stock-balance-operation-type.enum';
import { InvalidStockBalanceOperationTypeException } from '../exceptions/invalid-stock-balance-operation-type.exception';

@Injectable()
export class StockBalanceDomainService {
  constructor() {}

  validateStockBalance(
    stockBalance: StockBalanceEntity | null,
  ): StockBalanceEntity {
    if (!stockBalance) {
      throw new StockBalanceNotFoundException();
    }

    return stockBalance;
  }

  validateExistsStockBalanceUpdate(
    updateStockBalance: StockBalanceEntity | null,
    existingStockBalance: StockBalanceEntity | null,
  ): void {
    if (
      updateStockBalance &&
      existingStockBalance &&
      updateStockBalance.id !== existingStockBalance.id
    ) {
      throw new StockBalanceAlreadyExistsException();
    }
  }

  validateSufficientBalance(
    currentQuantity: number,
    newQuantity: number,
  ): void {
    if (newQuantity > currentQuantity) {
      throw new StockBalanceInsufficientBalanceException();
    }
  }

  validateOperationTypeCreate(operation: StockBalanceOperationType): void {
    if (operation === StockBalanceOperationType.SUBTRACT) {
      throw new InvalidStockBalanceOperationTypeException();
    }
  }

  validateOperationTypeUpdate(
    operation: StockBalanceOperationType,
    currentQuantity: number,
    newQuantity: number,
  ): number {
    switch (operation) {
      case StockBalanceOperationType.ADD:
        return currentQuantity + newQuantity;
      case StockBalanceOperationType.SUBTRACT:
        this.validateSufficientBalance(currentQuantity, newQuantity);
        return currentQuantity - newQuantity;
      default:
        return currentQuantity;
    }
  }
}
