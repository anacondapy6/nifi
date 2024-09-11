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

import { ComponentType } from 'libs/shared/src';

export const statusHomeHistoryFeatureKey = 'statusHome-history';

export interface StatusHomeHistoryRequest {
    source: string;
    componentId: string;
    componentType: ComponentType;
}

export interface NodeStatusHomeHistoryRequest {
    source: string;
}

export interface FieldDescriptor {
    description: string;
    field: string;
    formatter: string;
    label: string;
}

export interface ComponentDetails {
    'Group Id': string;
    Id: string;
    Name: string;
    Type: ComponentType;
}

export interface StatusHomeHistoryAggregateSnapshot {
    timestamp: number;
    statusHomeMetrics: any[];
}

export interface NodeSnapshot {
    nodeId: string;
    address: string;
    apiPort: string;
    statusHomeSnapshots: any[];
}

export interface StatusHomeHistory {
    aggregateSnapshots: StatusHomeHistoryAggregateSnapshot[];
    componentDetails: ComponentDetails;
    fieldDescriptors: FieldDescriptor[];
    generated: string;
    nodeSnapshots?: NodeSnapshot[];
}

export interface StatusHomeHistoryEntity {
    canRead: boolean;
    statusHomeHistory: StatusHomeHistory;
}

export interface StatusHomeHistoryResponse {
    statusHomeHistory: StatusHomeHistoryEntity;
}

export interface StatusHomeHistoryState {
    statusHomeHistory: StatusHomeHistoryEntity;
    loadedTimestamp: string;
    statusHome: 'pending' | 'loading' | 'error' | 'success';
}
