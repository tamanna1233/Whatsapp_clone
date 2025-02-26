import { axiosInstances } from '@/services/axios';
import { create } from 'zustand';

export const useStatus = create((set) => ({
      myStatus: '',
      Status: '',

      getMystatus: async () => {
            const res = await axiosInstances.get('/status/getmystatus');
            if (res.data.success) {
                  console.log(res.data.data);
                  set({ myStatus: res.data.data });
            } else {
                  console.log(res?.data);
            }
      },

      getAllStatus: async () => {
            const res = await axiosInstances.get('/status/getallstatus');
            if (res.data.success) {
                  console.log(res.data.data);
                  set({ status: res.data.data });
            } else {
                  console.log(res?.data);
            }
      },
}));
