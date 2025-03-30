import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './getApiSlice';

export const getAPI = (params, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${params}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}