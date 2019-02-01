import { VILLAGE_MODAL } from '../constants';
import DatabaseWrapper from '../models';

class VillageActions {
	static async getAllVillages(req, res) {
		const villages = await DatabaseWrapper.findAll(VILLAGE_MODAL, {});
		return res.status(200).json({ records: villages });
	}

	static async getVillage(req, res) {
		const { id: villageId } = req.params;

		const village = await DatabaseWrapper.findOne(VILLAGE_MODAL, villageId);

		return res.status(200).json({ record: village });
	}

	static async createVillage(req, res) {
		const data = req.body;

		try {
			const village = await DatabaseWrapper.createOne(VILLAGE_MODAL, data);
			return res.status(201).json({ record: village });
		} catch (err) {
			if (err.name === 'SequelizeForeignKeyConstraintError') {
				return res.status(400).json({ message: `Could not find the ${err.table} selected` });
			}
			return res.status(400).json({ message: err.errors[0].message });
		}
	}

	static async updateVillage(req, res) {
		const { id: villageId } = req.params;
		const update = req.body;

		try {
			const village = await DatabaseWrapper.updateOne(
				VILLAGE_MODAL, { id: villageId }, update
			);

			return res.status(202).json({ record: village });
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	static async deleteVillage(req, res) {
		const { id: villageId } = req.params;

		const data = await DatabaseWrapper.deleteOne(VILLAGE_MODAL, { id: villageId });

		if (data) return res.status(204).json({ message: data });

		return res.status(400).json({ message: 'Could not delete the requested record' });
	}
}

export default VillageActions;
