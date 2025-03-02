import * as reduxType from "@/redux/constants";

export const updateChartData = (chart_data: any) => ({
  type: reduxType.UPDATE_CHART_DATA,
  payload: chart_data,
});