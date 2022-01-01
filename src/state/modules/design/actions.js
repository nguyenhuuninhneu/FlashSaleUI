import * as types from "./types";

export const fetchDesignLoading = () => {
  return {
    type: types.FETCH_DESIGN_LOADING,
  };
};

export const fetchDesignCompleted = (data) => {
  return {
    type: types.FETCH_DESIGN_COMPLETED,
    payload: data,
  };
};

export const fetchDesignFailed = (data) => {
  return {
    type: types.FETCH_DESIGN_FAILED,
    payload: data,
  };
};

export const setDesign = (data) => {
  debugger;
  return {
    type: types.SET_DESIGN,
    payload: data,
  };
};

// export const setLayoutType = (data) => {
//   return {
//     type: types.SET_LAYOUT_TYPE,
//     payload: data,
//   };
// };

// export const setEnableTimerCountDown = (data) => {
//   return {
//     type: types.SET_ENABLE_TIMER_COUNTDOWN,
//     payload: data,
//   };
// };

// export const setTimerColor = (data) => {
//   return {
//     type: types.SET_TIMER_COLOR,
//     payload: data,
//   };
// };

// export const setBackgroundColor = (data) => {
//   return {
//     type: types.SET_BACKGROUND_COLOR,
//     payload: data,
//   };
// };

// export const setShowProcessBar = (data) => {
//   return {
//     type: types.SET_SHOW_PROCESS_BAR,
//     payload: data,
//   };
// };

// export const setColorProduct = (data) => {
//   return {
//     type: types.SET_COLOR_PRODUCT,
//     payload: data,
//   };
// };

// export const setNumberARow = (data) => {
//   return {
//     type: types.SET_NUMBER_A_ROW,
//     payload: data,
//   };
// };
// export const setUrlLogo = (data) => {
//   return {
//     type: types.SET_URL_LOGO,
//     payload: data,
//   };
// };
// export const setUrlIcon = (data) => {
//   return {
//     type: types.SET_URL_ICON,
//     payload: data,
//   };
// };


// export const setTextSoldLabel = (data) => {
//   return {
//     type: types.SET_TEXT_SOLD_LABEL,
//     payload: data,
//   };
// };


// export const setTextAlmostSoldOut = (data) => {
//   return {
//     type: types.SET_TEXT_ALMOST_SOLD_OUT,
//     payload: data,
//   };
// };

// export const setTextJustSoldLabel = (data) => {
//   return {
//     type: types.SET_TEXT_JUST_SOLD_LABEL,
//     payload: data,
//   };
// };

export const setIsSaveLoading = (data) => {
  return {
    type: types.SET_ISSAVELOADING,
    payload: data,
  };
};


export const saveDesignCompleted = (data) => {
  return {
    type: types.SAVE_DESIGNCOMPLETED,
    payload: data,
  };
};


export const saveDesignFailed = (data) => {
  return {
    type: types.SAVE_DESIGNFAILED,
    payload: data,
  };
};
