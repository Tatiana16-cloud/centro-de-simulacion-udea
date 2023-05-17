import { helpHttp } from '../helpers/helpHttp';
import { base_url } from '../Config/config';

class DeviceService {
    api = helpHttp();
    url = base_url + "/devices"
    

    async getAllData(){
        try {
            const result = await this.api.get(this.url);
            return {response: result}
        } catch (error) {
            return {error}
        }
    }

    async getById(id){
        try {
            let endpoint = `${this.url}/${id}`;
            const result = await this.api.get(endpoint);
            return {response: result}
        } catch (error) {
            return {error}
        }
    }

    async createData(data){
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
    
        try {
            const result = await this.api.post(this.url, options);
            return {response: result}
        } catch (error) {
            return {error}
        }
    }
    
    async updateData(data){
        let endpoint = `${this.url}/${data?.id}`;
    
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
    
        try {
            const res = await this.api.put(endpoint, options);
            return {response: data}
        } catch (error) {
            return {error}
        }
    }

    async uploadImage(formData){
        let endpoint = `${this.url}/uploadImage`;
    
        let options = {
            body:formData,
            headers: {},
        };

        // Send the image to the server
        try {
            const res = await this.api.post(endpoint, options);
            return {response: res}
        } catch (error) {
            return {error}
        }
    }
    
    async deleteData(id){
        let endpoint = `${this.url}/${id}`;
        let options = {
        headers: { "content-type": "application/json" },
        };

        try {
            await this.api.del(endpoint, options);
            return {response: id}
        } catch (error) {
            return {error}
        } 
    }
}

export default DeviceService