import { toast } from '@/hooks/use-toast';
import { axiosInstances } from '@/services/axios';
import { create } from 'zustand';

export const useStatus = create((set,get) => ({
      myStatus: [],
      Status: '',
      uploadStatus: async (data) => {
            const formdata = new FormData();
            formdata.append('content', data);
            const res = await axiosInstances.post('/status/uploadStatus', formdata);
            if (res.data.success) {
                  toast({
                        title: 'Status uploaded successfully',
                  });
            } else {
                  console.log(res.data.message);
            }
      },
      deleteStatus: async (id) => {
            console.log(get().myStatus[0].statusId==id)
            const res = await axiosInstances.delete(`/status/deletestatus/${id}`);
            if (res.data.success) {
                  set((state)=>({
                        myStatus: state?.myStatus?.filter((status)=>status?.statusId !=id 
                        )
                     }))
                  toast({
                        title: 'status deleted successfully',
                  });
                  
            } else {
                  console.log(res.data.message);
            }
      },

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
