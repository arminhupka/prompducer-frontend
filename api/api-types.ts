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

export interface UpsertPlanDto {
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

export type AudioJobCallbackDto = object;

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
  /** @example "https://s3.example.com/prompducer/audio/generated-track.wav" */
  url: string;
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
  status: "PENDING" | "FINISHED" | "FAILED";
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
  /**
   * 1-based position in the pending queue, or null when the job is no longer PENDING.
   * @example 3
   */
  queuePosition: number | null;
}

export interface PaginationMetaResponseDto {
  /** @example 1 */
  page: number;
  /** @example 10 */
  limit: number;
  /** @example 25 */
  total: number;
  /** @example 3 */
  totalPages: number;
}

export interface PaginatedPromptsResponseDto {
  items: GeneratedPromptResponseDto[];
  meta: PaginationMetaResponseDto;
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
  /**
   * Device fingerprint used to prevent free-credit farming.
   * @example "a1b2c3d4e5f6"
   */
  machineId?: string;
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
  /** @example "machine-8f2a6f5d" */
  machineId?: string;
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
  status:
    | "ACTIVE"
    | "TRIALING"
    | "PAST_DUE"
    | "INCOMPLETE"
    | "INCOMPLETE_EXPIRED"
    | "UNPAID"
    | "PAUSED"
    | "CANCELED"
    | "NONE";
  /** @example 1200 */
  credits: number;
  /**
   * @format date-time
   * @example "2026-03-13T17:37:29.000Z"
   */
  nextPaymentDate?: string | null;
  /** @example false */
  cancelAtPeriodEnd: boolean;
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
  /** @example "USER" */
  role: "ADMIN" | "USER";
  subscription?: MeSubscriptionResponseDto | null;
  /** @example 350 */
  totalUsedCredits: number;
}

export interface ResetPasswordDto {
  /**
   * @format email
   * @example "johndoe@example.com"
   */
  email: string;
}

export interface ConfirmResetPasswordDto {
  /** Reset token from the emailed link. */
  token: string;
  /** @minLength 8 */
  password: string;
  /** @minLength 8 */
  passwordConfirmation: string;
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

export interface GenerateCouponsPackDto {
  /** @example "topup_660" */
  packId: string;
  /**
   * @min 1
   * @max 1000
   * @example 50
   */
  count: number;
}

export interface UseCouponDto {
  /** @example "PROMP-7H2K-9D1Q" */
  code: string;
}

export interface CreateCreditCheckoutDto {
  /** @example "topup_660" */
  packId: string;
}

export interface ContactDto {
  /** @example "Amine" */
  name: string;
  /** @example "you@example.com" */
  email: string;
  /** @example "Billing question" */
  subject: string;
  /** @example "Hi, I have a question about…" */
  message: string;
}

export interface AdjustCreditsDto {
  /**
   * Credits to add (positive) or remove (negative). Non-zero.
   * @example 300
   */
  amount: number;
}

export interface SetRoleDto {
  /** @example "ADMIN" */
  role: "ADMIN" | "USER";
}

export interface BackupHisePresetDto {
  /**
   * @maxLength 200
   * @example "My Trap Kit"
   */
  name: string;
  /**
   * Generation this preset belongs to. Must be owned by the caller.
   * @format uuid
   * @example "2d7f8f78-8bd2-4e6c-9f97-bac3e3a2e55d"
   */
  promptId: string;
  /**
   * Raw HISE .preset XML, stored byte-for-byte.
   * @maxLength 10000000
   * @example "<?xml version="1.0" encoding="UTF-8"?><Preset Version="1.0.0"></Preset>"
   */
  xml: string;
}

export interface BackupHisePresetResponseDto {
  /**
   * @format uuid
   * @example "7c1c3a0e-9a1a-4c0e-9f9b-2b5a1d8e4f31"
   */
  id: string;
  /**
   * Name the preset was stored under. Gets an incrementing suffix when the requested name is already taken.
   * @example "My Trap Kit (1)"
   */
  name: string;
  /**
   * @format uuid
   * @example "2d7f8f78-8bd2-4e6c-9f97-bac3e3a2e55d"
   */
  promptId: string;
  /**
   * @format date-time
   * @example "2026-02-12T10:00:00.000Z"
   */
  createdAt: string;
}

export interface HisePresetPromptResponseDto {
  /**
   * @format uuid
   * @example "2d7f8f78-8bd2-4e6c-9f97-bac3e3a2e55d"
   */
  id: string;
  /** @example "Trap beat with deep 808 and dark melody" */
  prompt: string;
  /** @example "FINISHED" */
  status: "PENDING" | "FINISHED" | "FAILED";
  /**
   * @format date-time
   * @example "2026-02-12T10:00:00.000Z"
   */
  createdAt: string;
  files: PromptFileResponseDto[];
}

export interface HisePresetResponseDto {
  /**
   * @format uuid
   * @example "7c1c3a0e-9a1a-4c0e-9f9b-2b5a1d8e4f31"
   */
  id: string;
  /** @example "My Trap Kit" */
  name: string;
  /**
   * Raw HISE .preset XML, byte-identical to what was backed up.
   * @example "<?xml version="1.0" encoding="UTF-8"?><Preset Version="1.0.0"></Preset>"
   */
  xml: string;
  /**
   * @format uuid
   * @example "2d7f8f78-8bd2-4e6c-9f97-bac3e3a2e55d"
   */
  promptId: string;
  prompt: HisePresetPromptResponseDto;
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

export interface PaginatedHisePresetsResponseDto {
  items: HisePresetResponseDto[];
  meta: PaginationMetaResponseDto;
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
  JsonApi = "application/vnd.api+json",
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
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
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
      }, new FormData());
    },
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
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
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
      data: UpsertPlanDto,
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
     * @name PlansControllerUpdatePlan
     * @summary Update subscription plan
     * @request PUT:/plans/{id}
     * @secure
     */
    plansControllerUpdatePlan: (
      id: string,
      data: UpsertPlanDto,
      params: RequestParams = {},
    ) =>
      this.request<PlanResponseDto, void>({
        path: `/plans/${id}`,
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
     * @tags Plans
     * @name PlansControllerDeletePlan
     * @summary Delete subscription plan
     * @request DELETE:/plans/{id}
     * @secure
     */
    plansControllerDeletePlan: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/plans/${id}`,
        method: "DELETE",
        secure: true,
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
     * @summary Schedule subscription cancellation
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
  audioJobs = {
    /**
     * No description
     *
     * @tags AudioCallback
     * @name AudioCallbackControllerHandleCallback
     * @request POST:/audio-jobs/{id}/complete
     */
    audioCallbackControllerHandleCallback: (
      id: string,
      data: AudioJobCallbackDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/audio-jobs/${id}/complete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  files = {
    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerGetFiles
     * @request GET:/files/{id}
     */
    filesControllerGetFiles: (id: string, params: RequestParams = {}) =>
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
      this.request<PaginatedPromptsResponseDto, void>({
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

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerResetPassword
     * @summary Reset user password
     * @request POST:/auth/reset-password
     */
    authControllerResetPassword: (
      data: ResetPasswordDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/reset-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerConfirmResetPassword
     * @summary Set a new password using a reset token
     * @request POST:/auth/reset-password/confirm
     */
    authControllerConfirmResetPassword: (
      data: ConfirmResetPasswordDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/reset-password/confirm`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
     * @name CouponsControllerGenerate
     * @summary Generate coupon codes for a credit pack (admin)
     * @request POST:/coupons/generate
     * @secure
     */
    couponsControllerGenerate: (
      data: GenerateCouponsPackDto,
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/coupons/generate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Coupons
     * @name CouponsControllerList
     * @summary List coupons with filters (admin)
     * @request GET:/coupons
     * @secure
     */
    couponsControllerList: (
      query: {
        packId: string;
        status: string;
        page: string;
        pageSize: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coupons`,
        method: "GET",
        query: query,
        secure: true,
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

    /**
     * No description
     *
     * @tags Coupons
     * @name CouponsControllerExport
     * @summary Export coupon codes as a flat list (admin)
     * @request GET:/coupons/export
     * @secure
     */
    couponsControllerExport: (
      query: {
        packId: string;
        status: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coupons/export`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  credits = {
    /**
     * No description
     *
     * @tags Credits
     * @name CreditsControllerGetPacks
     * @summary List available credit top-up packs
     * @request GET:/credits/packs
     */
    creditsControllerGetPacks: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/credits/packs`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Credits
     * @name CreditsControllerCheckout
     * @summary Start checkout for a credit top-up pack
     * @request POST:/credits/checkout
     * @secure
     */
    creditsControllerCheckout: (
      data: CreateCreditCheckoutDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/credits/checkout`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  contact = {
    /**
     * No description
     *
     * @tags Contact
     * @name ContactControllerSend
     * @summary Send a contact / support message
     * @request POST:/contact
     */
    contactControllerSend: (data: ContactDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/contact`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerOverview
     * @summary Dashboard analytics overview
     * @request GET:/admin/overview
     * @secure
     */
    adminControllerOverview: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/admin/overview`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerUsers
     * @summary List / search users (paginated)
     * @request GET:/admin/users
     * @secure
     */
    adminControllerUsers: (
      query: {
        query: string;
        page: string;
        pageSize: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/admin/users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerUser
     * @summary Get a single user with recent activity
     * @request GET:/admin/users/{id}
     * @secure
     */
    adminControllerUser: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/admin/users/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerAdjustCredits
     * @summary Add or remove credits from a user
     * @request POST:/admin/users/{id}/credits
     * @secure
     */
    adminControllerAdjustCredits: (
      id: string,
      data: AdjustCreditsDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/admin/users/${id}/credits`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerSetRole
     * @summary Set a user's role
     * @request POST:/admin/users/{id}/role
     * @secure
     */
    adminControllerSetRole: (
      id: string,
      data: SetRoleDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/admin/users/${id}/role`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerGenerations
     * @summary List recent generations
     * @request GET:/admin/generations
     * @secure
     */
    adminControllerGenerations: (
      query: {
        page: string;
        pageSize: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/admin/generations`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerSubscriptions
     * @summary List subscriptions (payments)
     * @request GET:/admin/subscriptions
     * @secure
     */
    adminControllerSubscriptions: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/admin/subscriptions`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  hisePresets = {
    /**
     * No description
     *
     * @tags Hise Presets
     * @name HisePresetsControllerBackup
     * @summary Back up a HISE preset for the current user
     * @request POST:/hise-presets/backup
     * @secure
     */
    hisePresetsControllerBackup: (
      data: BackupHisePresetDto,
      params: RequestParams = {},
    ) =>
      this.request<BackupHisePresetResponseDto, void>({
        path: `/hise-presets/backup`,
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
     * @tags Hise Presets
     * @name HisePresetsControllerRestore
     * @summary Get current user backed up HISE presets
     * @request GET:/hise-presets/restore
     * @secure
     */
    hisePresetsControllerRestore: (params: RequestParams = {}) =>
      this.request<PaginatedHisePresetsResponseDto, void>({
        path: `/hise-presets/restore`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
