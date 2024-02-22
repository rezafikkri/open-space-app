/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */

import api from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD'
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload
    }
  };
}

function asyncPreloadProccess() {
  return async (dispatch) => {
    try {
      // preload proccess
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // fallback proccess
      dispatch(setAuthUserActionCreator(null));
    } finally {
      // end preload proccess
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProccess };
