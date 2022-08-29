import shRequest from '../../index';

import { IDataType } from '../../types';

enum DashboardAPI {
	categoryGoodsCount = '/goods/category/count',
	categoryGoodsSale = '/goods/category/sale',
	categoryGoodsFavor = '/goods/category/favor',
	addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
	return shRequest.get<IDataType>({
		url: DashboardAPI.categoryGoodsCount
	});
}

export function getCategoryGoodsSale() {
	return shRequest.get<IDataType>({
		url: DashboardAPI.categoryGoodsSale
	});
}

export function getCategoryGoodsFavor() {
	return shRequest.get<IDataType>({
		url: DashboardAPI.categoryGoodsFavor
	});
}

export function getAddressGoodsSale() {
	return shRequest.get<IDataType>({
		url: DashboardAPI.addressGoodsSale
	});
}
