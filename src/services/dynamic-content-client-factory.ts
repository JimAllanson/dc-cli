/* eslint-disable @typescript-eslint/camelcase */
import { DynamicContent } from 'dc-management-sdk-js';
import { ConfigurationParameters } from '../commands/configure';
import axiosRetry from 'axios-retry';
import axios from 'axios';

const dynamicContentClientFactory = (config: ConfigurationParameters): DynamicContent => {
  const axiosClient = axios.create();
  axiosRetry(axiosClient, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

  return new DynamicContent(
    {
      client_id: config.clientId,
      client_secret: config.clientSecret
    },
    {
      apiUrl: process.env.API_URL,
      authUrl: process.env.AUTH_URL
    },
    axiosClient
  );
};

export default dynamicContentClientFactory;
