/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ChangeDioptresQuery {
  /**
   * Dioptres
   * @minLength 1
   */
  dioptres?: string;
}

export interface UserChangeData {
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email?: string;
  /**
   * First name
   * @minLength 1
   */
  first_name?: string;
  /**
   * Last name
   * @minLength 1
   */
  last_name?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

export interface User {
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

export interface Lens {
  /** Lens id */
  lens_id?: number;
  /** Name */
  name?: string | null;
  /** Description */
  description?: string | null;
  /** Status */
  status?: string | null;
  /** Url */
  url?: string | null;
  /**
   * Price
   * @min -2147483648
   * @max 2147483647
   */
  price?: number | null;
}

export interface MToMInserted {
  lens?: Lens;
  /** Dioptres */
  dioptres?: string | null;
}

export interface SingleGlassesOrder {
  /** Glasses order id */
  glasses_order_id?: number;
  /**
   * Status
   * @minLength 1
   */
  status?: string;
  /**
   * Date created
   * @format date-time
   */
  date_created?: string;
  /**
   * Creator
   * @pattern ^[\w.@+-]+$
   */
  creator?: string;
  /**
   * Date formed
   * @format date-time
   */
  date_formed?: string | null;
  /**
   * Moderator
   * @pattern ^[\w.@+-]+$
   */
  moderator?: string;
  /**
   * Order sum
   * @min -2147483648
   * @max 2147483647
   */
  order_sum?: number | null;
  /** Phone */
  phone?: string | null;
  /**
   * Date ended
   * @format date-time
   */
  date_ended?: string | null;
  lenses?: MToMInserted[];
}

export interface GlassesOrder {
  /** Glasses order id */
  glasses_order_id?: number;
  /**
   * Status
   * @minLength 1
   */
  status?: string;
  /**
   * Date created
   * @format date-time
   */
  date_created?: string;
  /**
   * Creator
   * @pattern ^[\w.@+-]+$
   */
  creator?: string;
  /**
   * Date formed
   * @format date-time
   */
  date_formed?: string | null;
  /**
   * Moderator
   * @pattern ^[\w.@+-]+$
   */
  moderator?: string;
  /**
   * Order sum
   * @min -2147483648
   * @max 2147483647
   */
  order_sum?: number | null;
  /** Phone */
  phone?: string | null;
  /**
   * Date ended
   * @format date-time
   */
  date_ended?: string | null;
}

export interface LensesListResponse {
  lenses: Lens[];
  /** Draft glassesorder id */
  draft_GlassesOrder_id: number;
  /** Draft glassesorder lens count */
  draft_GlassesOrder_lens_count: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  lensesInOrder = {
    /**
     * No description
     *
     * @tags LensesInOrder
     * @name LensesInOrderUpdate
     * @request PUT:/LensesInOrder/{glasses_order_id}/{lens_id}/
     * @secure
     */
    lensesInOrderUpdate: (
      glassesOrderId: string,
      lensId: string,
      data: ChangeDioptresQuery,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/LensesInOrder/${glassesOrderId}/${lensId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags LensesInOrder
     * @name LensesInOrderDelete
     * @request DELETE:/LensesInOrder/{glasses_order_id}/{lens_id}/
     * @secure
     */
    lensesInOrderDelete: (glassesOrderId: string, lensId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/LensesInOrder/${glassesOrderId}/${lensId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name UserUpdate
     * @request PUT:/User/
     * @secure
     */
    userUpdate: (data: UserChangeData, params: RequestParams = {}) =>
      this.request<UserChangeData, any>({
        path: `/User/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserLoginCreate
     * @request POST:/User/login/
     * @secure
     */
    userLoginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/User/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserLogoutCreate
     * @request POST:/User/logout/
     * @secure
     */
    userLogoutCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/User/logout/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserRegisterCreate
     * @request POST:/User/register/
     * @secure
     */
    userRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/User/register/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  glassesOrder = {
    /**
     * No description
     *
     * @tags glasses_order
     * @name GlassesOrderRead
     * @request GET:/glasses_order/{id}/
     * @secure
     */
    glassesOrderRead: (id: string, params: RequestParams = {}) =>
      this.request<SingleGlassesOrder, any>({
        path: `/glasses_order/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags glasses_order
     * @name GlassesOrderUpdate
     * @request PUT:/glasses_order/{id}/
     * @secure
     */
    glassesOrderUpdate: (id: string, data: SingleGlassesOrder, params: RequestParams = {}) =>
      this.request<SingleGlassesOrder, any>({
        path: `/glasses_order/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags glasses_order
     * @name GlassesOrderDelete
     * @request DELETE:/glasses_order/{id}/
     * @secure
     */
    glassesOrderDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/glasses_order/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags glasses_order
     * @name GlassesOrderModerateUpdate
     * @request PUT:/glasses_order/{id}/moderate/
     * @secure
     */
    glassesOrderModerateUpdate: (id: string, data: GlassesOrder, params: RequestParams = {}) =>
      this.request<GlassesOrder, any>({
        path: `/glasses_order/${id}/moderate/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags glasses_order
     * @name GlassesOrderSaveUpdate
     * @request PUT:/glasses_order/{id}/save/
     * @secure
     */
    glassesOrderSaveUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/glasses_order/${id}/save/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  glassesOrders = {
    /**
     * No description
     *
     * @tags glasses_orders
     * @name GlassesOrdersList
     * @request GET:/glasses_orders/
     * @secure
     */
    glassesOrdersList: (
      query?: {
        /** @minLength 1 */
        status?: string;
        /** @format date-time */
        min_date_formed?: string;
        /** @format date-time */
        max_date_formed?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GlassesOrder, any>({
        path: `/glasses_orders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  lens = {
    /**
     * No description
     *
     * @tags lens
     * @name LensRead
     * @request GET:/lens/{id}/
     * @secure
     */
    lensRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lens/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lens
     * @name LensUpdate
     * @request PUT:/lens/{id}/
     * @secure
     */
    lensUpdate: (id: string, data: Lens, params: RequestParams = {}) =>
      this.request<Lens, any>({
        path: `/lens/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lens
     * @name LensDelete
     * @request DELETE:/lens/{id}/
     * @secure
     */
    lensDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lens/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lens
     * @name LensAddCreate
     * @request POST:/lens/{id}/add/
     * @secure
     */
    lensAddCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lens/${id}/add/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lens
     * @name LensAddPictureCreate
     * @request POST:/lens/{id}/addPicture/
     * @secure
     */
    lensAddPictureCreate: (id: string, data: Lens, params: RequestParams = {}) =>
      this.request<Lens, any>({
        path: `/lens/${id}/addPicture/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  lenses = {
    /**
     * No description
     *
     * @tags lenses
     * @name LensesList
     * @request GET:/lenses/
     * @secure
     */
    lensesList: (
      query?: {
        /** @minLength 1 */
        search_lens?: string;
        search_price_max?: number;
        search_price_min?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<LensesListResponse, any>({
        path: `/lenses/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lenses
     * @name LensesCreate
     * @request POST:/lenses/
     * @secure
     */
    lensesCreate: (data: Lens, params: RequestParams = {}) =>
      this.request<Lens, any>({
        path: `/lenses/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
