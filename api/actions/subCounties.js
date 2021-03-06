import { SUB_COUNTY_MODAL } from '../constants';
import DatabaseWrapper from '../models';

class SubCountyActions {
	static async getAllSubCounties(req, res) {
		const subCounties = await DatabaseWrapper.findAll(SUB_COUNTY_MODAL, {});
		return res.status(200).json({ records: subCounties });
	}

	static async getSubCounty(req, res) {
		const { id: subCountyId } = req.params;

		const subCounty = await DatabaseWrapper.findOne(SUB_COUNTY_MODAL, subCountyId);

		return res.status(200).json({ record: subCounty });
	}

	static async createSubCounty(req, res) {
		const data = req.body;

		try {
			const subCounty = await DatabaseWrapper.createOne(SUB_COUNTY_MODAL, data);
			return res.status(201).json({ record: subCounty });
		} catch (err) {
			if (err.name === 'SequelizeForeignKeyConstraintError') {
				return res.status(400).json({ message: `Could not find the ${err.table} selected` });
			}
			return res.status(400).json({ message: err.errors[0].message });
		}
	}

	static async updateSubCounty(req, res) {
		const { id: subCountyId } = req.params;
		const update = req.body;
		if (!update.representativeId || update.representativeId === 'null') {
			update.representativeId = null;
		}
		
		try {
			const subCounty = await DatabaseWrapper.updateOne(
				SUB_COUNTY_MODAL, { id: subCountyId }, update
			);

			return res.status(202).json({ record: subCounty });
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	static async deleteSubCounty(req, res) {
		const { id: subCountyId } = req.params;

		const data = await DatabaseWrapper.deleteOne(SUB_COUNTY_MODAL, { id: subCountyId });

		if (data) return res.status(204).json({ message: data });

		return res.status(400).json({ message: 'Could not delete the requested record' });
	}
}

export default SubCountyActions;
