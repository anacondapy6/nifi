/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createAction, props } from '@ngrx/store';
import { NodeStatusHomeHistoryRequest, StatusHomeHistoryRequest, StatusHomeHistoryResponse } from './index';

const STATUS_HISTORY_PREFIX = '[StatusHome History]';

export const reloadStatusHomeHistory = createAction(
    `${STATUS_HISTORY_PREFIX} Reload StatusHome History`,
    props<{ request: StatusHomeHistoryRequest }>()
);

export const getStatusHomeHistoryAndOpenDialog = createAction(
    `${STATUS_HISTORY_PREFIX} Get StatusHome History and Open Dialog`,
    props<{ request: StatusHomeHistoryRequest }>()
);

export const getNodeStatusHomeHistoryAndOpenDialog = createAction(
    `${STATUS_HISTORY_PREFIX} Get Node StatusHome History and Open Dialog`,
    props<{ request: NodeStatusHomeHistoryRequest }>()
);

export const reloadStatusHomeHistorySuccess = createAction(
    `${STATUS_HISTORY_PREFIX} Reload StatusHome History Success`,
    props<{ response: StatusHomeHistoryResponse }>()
);

export const loadStatusHomeHistorySuccess = createAction(
    `${STATUS_HISTORY_PREFIX} Load StatusHome History Success`,
    props<{ request: StatusHomeHistoryRequest | NodeStatusHomeHistoryRequest; response: StatusHomeHistoryResponse }>()
);

export const openStatusHomeHistoryDialog = createAction(
    `${STATUS_HISTORY_PREFIX} Open StatusHome History Dialog`,
    props<{ request: StatusHomeHistoryRequest | NodeStatusHomeHistoryRequest }>()
);

export const statusHomeHistoryBannerError = createAction(
    `${STATUS_HISTORY_PREFIX} StatusHome History Banner Error`,
    props<{ error: string }>()
);

export const clearStatusHomeHistory = createAction(`${STATUS_HISTORY_PREFIX} Clear StatusHome History`);

export const viewStatusHomeHistoryComplete = createAction(
    `${STATUS_HISTORY_PREFIX} View StatusHome History Complete`,
    props<{ request: StatusHomeHistoryRequest }>()
);

export const viewNodeStatusHomeHistoryComplete = createAction(
    `${STATUS_HISTORY_PREFIX} View Node StatusHome History Complete`,
    props<{ request: NodeStatusHomeHistoryRequest }>()
);
