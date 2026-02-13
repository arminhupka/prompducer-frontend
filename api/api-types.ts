/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreatePlanDto {
  /**
   * @minLength 3
   * @maxLength 16
   * @example "Pro"
   */
  name: string;
  /**
   * @maxLength 255
   * @example "Best plan for regular creators with monthly credits."
   */
  description: string;
  /**
   * @min 1
   * @example 1999
   */
  price: number;
  /**
   * @min 1
   * @example 1000
   */
  credits: number;
}

export interface PlanResponseDto {
  /**
   * @format uuid
   * @example "8a0f2b24-8c6b-47fb-92b5-a95e6f4309a0"
   */
  id: string;
  /** @example "Pro" */
  name: string;
  /** @example "Best plan for regular creators" */
  description: string;
  /** @example 1999 */
  price: number;
  /** @example 1000 */
  credits: number;
  /** @example false */
  featured: boolean;
  /** @example ["Commercial license","Priority generation"] */
  features: string[];
  /**
   * @format date-time
   * @example "2026-02-12T10:00:00.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2026-02-12T10:00:00.000Z"
   */
  updatedAt: string;
}

export interface ActivatePlanResponseDto {
  /** @example "https://checkout.stripe.com/c/pay/cs_test_123456789" */
  url: string | null;
}

export interface PromptFileResponseDto {
  /**
   * @format uuid
   * @example "f8d7ce4d-3a8d-4f48-8f67-2e619e7ca0a4"
   */
  id: string;
  /** @example "generated-track.wav" */
  fileName: string;
  /** @example "audio/generated-track.wav" */
  key: string;
  /**
   * @format date-time
   * @example "2026-02-12T10:00:00.000Z"
   */
  createdAt: string;
}

export interface GeneratedPromptResponseDto {
  /**
   * @format uuid
   * @example "2d7f8f78-8bd2-4e6c-9f97-bac3e3a2e55d"
   */
  id: string;
  /** @example "Trap beat with deep 808 and dark melody" */
  prompt: string;
  /** @example "PENDING" */
  status: "PENDING" | "FINISHED";
  /**
   * @format date-time
   * @example "2026-02-12T10:00:00.000Z"
   */
  createdAt: string;
  /**
   * @format uuid
   * @example "9af2c77c-08bb-4890-9a77-e16ca95f89d7"
   */
  authorId: string;
  files: PromptFileResponseDto[];
}

export interface GenerateAudioDto {
  /** @example "Trap beat with deep 808 and dark melody" */
  prompt: string;
}

export interface GenerateSoundResponseDto {
  /**
   * @format uuid
   * @example "2d7f8f78-8bd2-4e6c-9f97-bac3e3a2e55d"
   */
  id: string;
  /** @example "Trap beat with deep 808 and dark melody" */
  prompt: string;
}

export interface CreateUserDto {
  /**
   * @format email
   * @example "user@example.com"
   */
  email: string;
  /**
   * @minLength 8
   * @example "StrongPassword123!"
   */
  password: string;
  /**
   * @minLength 8
   * @example "StrongPassword123!"
   */
  passwordConfirmation: string;
}

export interface LoginDto {
  /**
   * @format email
   * @example "user@example.com"
   */
  email: string;
  /**
   * @minLength 1
   * @example "StrongPassword123!"
   */
  password: string;
}

export interface LoginResponseDto {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  token: string;
}

export interface MePlanResponseDto {
  /** @example "Pro" */
  name: string;
  /** @example 29.99 */
  price: number;
}

export interface MeSubscriptionResponseDto {
  /** @example "ACTIVE" */
  status: "ACTIVE" | "CANCELED" | "NONE";
  /** @example 1200 */
  credits: number;
  /**
   * @format date-time
   * @example "2026-12-31T23:59:59.000Z"
   */
  activeUntil?: string | null;
  plan?: MePlanResponseDto | null;
}

export interface MeResponseDto {
  /**
   * @format uuid
   * @example "2d7f8f78-8bd2-4e6c-9f97-bac3e3a2e55d"
   */
  id: string;
  /**
   * @format email
   * @example "user@example.com"
   */
  email: string;
  subscription?: MeSubscriptionResponseDto | null;
  /** @example 350 */
  totalUsedCredits: number;
}

export interface CreateCouponsDto {
  /**
   * @min 1
   * @max 1000
   * @example 20
   */
  amount: number;
  /**
   * @min 1
   * @example 200
   */
  tokens: number;
}

export interface CouponResponseDto {
  /**
   * @format uuid
   * @example "8a0f2b24-8c6b-47fb-92b5-a95e6f4309a0"
   */
  id: string;
  /** @example "PROMP-7H2K-9D1Q" */
  code: string;
  /** @example 200 */
  tokens: number;
  /** @example false */
  used: boolean;
  /**
   * @format date-time
   * @example "2026-02-12T10:00:00.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2026-02-12T10:00:00.000Z"
   */
  updatedAt: string;
}

export interface UseCouponDto {
  /** @example "PROMP-7H2K-9D1Q" */
  code: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Prompducer
 * @version 1.0
 * @contact
 *
 * The Prompducer API description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  plans = {
    /**
     * No description
     *
     * @tags Plans
     * @name PlansControllerCreatePlan
     * @summary Creating new subscription plan
     * @request POST:/plans
     * @secure
     */
    plansControllerCreatePlan: (
      data: CreatePlanDto,
      params: RequestParams = {},
    ) =>
      this.request<PlanResponseDto, void>({
        path: `/plans`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Plans
     * @name PlansControllerGetPlans
     * @summary Get subscription plans
     * @request GET:/plans
     */
    plansControllerGetPlans: (params: RequestParams = {}) =>
      this.request<PlanResponseDto[], any>({
        path: `/plans`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Plans
     * @name PlansControllerActivatePlan
     * @summary Activate subscription plan
     * @request POST:/plans/activate/{id}
     * @secure
     */
    plansControllerActivatePlan: (id: string, params: RequestParams = {}) =>
      this.request<ActivatePlanResponseDto, void>({
        path: `/plans/activate/${id}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Plans
     * @name PlansControllerDeactivatePlan
     * @summary Deactivate subscription plan
     * @request POST:/plans/deactivate
     * @secure
     */
    plansControllerDeactivatePlan: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/plans/deactivate`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  stripe = {
    /**
     * No description
     *
     * @tags Stripe
     * @name StripeControllerWebhook
     * @summary Endpoint for Stripe Webhook
     * @request POST:/stripe/webhook
     */
    stripeControllerWebhook: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stripe/webhook`,
        method: "POST",
        ...params,
      }),
  };
  files = {
    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerGetFile
     * @request GET:/files/{id}
     */
    filesControllerGetFile: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/files/${id}`,
        method: "GET",
        ...params,
      }),
  };
  prompts = {
    /**
     * No description
     *
     * @tags Prompts
     * @name PromptsControllerGetUserPrompts
     * @summary Get current user prompts
     * @request GET:/prompts
     * @secure
     */
    promptsControllerGetUserPrompts: (params: RequestParams = {}) =>
      this.request<GeneratedPromptResponseDto[], void>({
        path: `/prompts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  generate = {
    /**
     * No description
     *
     * @tags Generate
     * @name GenerateControllerGenerateSound
     * @summary Generate new sound
     * @request POST:/generate
     * @secure
     */
    generateControllerGenerateSound: (
      data: GenerateAudioDto,
      params: RequestParams = {},
    ) =>
      this.request<GenerateSoundResponseDto, void>({
        path: `/generate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Generate
     * @name GenerateControllerGetGeneratedPrompt
     * @summary Get current state of generated sound job
     * @request GET:/generate/{id}
     * @secure
     */
    generateControllerGetGeneratedPrompt: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<GeneratedPromptResponseDto, void>({
        path: `/generate/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @summary User registration
     * @request POST:/auth/register
     */
    authControllerRegister: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary User login
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, void>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSecured
     * @summary Get current logged user
     * @request GET:/auth/me
     * @secure
     */
    authControllerSecured: (params: RequestParams = {}) =>
      this.request<MeResponseDto, void>({
        path: `/auth/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  coupons = {
    /**
     * No description
     *
     * @tags Coupons
     * @name CouponsControllerCreateCoupons
     * @summary Generate coupons
     * @request POST:/coupons/create
     * @secure
     */
    couponsControllerCreateCoupons: (
      data: CreateCouponsDto,
      params: RequestParams = {},
    ) =>
      this.request<CouponResponseDto[], void>({
        path: `/coupons/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Coupons
     * @name CouponsControllerUseCoupon
     * @summary Use coupon
     * @request POST:/coupons
     * @secure
     */
    couponsControllerUseCoupon: (
      data: UseCouponDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/coupons`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
