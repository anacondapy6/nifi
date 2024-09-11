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

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NiFiState } from '../index';
import { StatusHistoryService } from '../../service/status-history.service';
import * as StatusHomeHistoryActions from './home-history.actions';
import { StatusHomeHistoryRequest } from './index';
import { catchError, filter, from, map, of, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StatusHistory } from '../../ui/common/status-history/status-history.component';
import { HomeHistory } from '../../pages/management/ui/history/home-history.component';
import * as ErrorActions from '../../state/error/error.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHelper } from '../../service/error-helper.service';

@Injectable()
export class StatusHomeHistoryEffects {
    constructor(
        private actions$: Actions,
        private store: Store<NiFiState>,
        private statusHomeHistoryService: StatusHistoryService,
        private dialog: MatDialog,
        private errorHelper: ErrorHelper
    ) {}

    reloadComponentStatusHomeHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StatusHomeHistoryActions.reloadStatusHomeHistory),
            map((action) => action.request),
            filter((request) => !!request.componentId && !!request.componentType),
            switchMap((request: StatusHomeHistoryRequest) =>
                from(
                    this.statusHomeHistoryService
                        .getComponentStatusHistory(request.componentType, request.componentId)
                        .pipe(
                            map((response: any) =>
                                StatusHomeHistoryActions.reloadStatusHomeHistorySuccess({
                                    response: {
                                        statusHomeHistory: {
                                            canRead: response.canRead,
                                            statusHomeHistory: response.statusHomeHistory
                                        }
                                    }
                                })
                            ),
                            catchError((errorResponse: HttpErrorResponse) =>
                                this.bannerOrFullScreenError(errorResponse)
                            )
                        )
                )
            )
        )
    );

    reloadNodeStatusHomeHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StatusHomeHistoryActions.reloadStatusHomeHistory),
            map((action) => action.request),
            filter((request) => !request.componentId && !request.componentType),
            switchMap(() =>
                from(
                    this.statusHomeHistoryService.getNodeStatusHistory().pipe(
                        map((response: any) =>
                            StatusHomeHistoryActions.reloadStatusHomeHistorySuccess({
                                response: {
                                    statusHomeHistory: {
                                        canRead: response.canRead,
                                        statusHomeHistory: response.statusHomeHistory
                                    }
                                }
                            })
                        ),
                        catchError((errorResponse: HttpErrorResponse) => this.bannerOrFullScreenError(errorResponse))
                    )
                )
            )
        )
    );

    getStatusHomeHistoryAndOpenDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StatusHomeHistoryActions.getStatusHomeHistoryAndOpenDialog),
            map((action) => action.request),
            switchMap((request) =>
                from(
                    this.statusHomeHistoryService
                        .getComponentStatusHistory(request.componentType, request.componentId)
                        .pipe(
                            map((response: any) =>
                                StatusHomeHistoryActions.loadStatusHomeHistorySuccess({
                                    request,
                                    response: {
                                        statusHomeHistory: {
                                            canRead: response.canRead,
                                            statusHomeHistory: response.statusHomeHistory
                                        }
                                    }
                                })
                            ),
                            catchError((errorResponse: HttpErrorResponse) =>
                                this.snackBarOrFullScreenError(errorResponse)
                            )
                        )
                )
            )
        )
    );

    getNodeStatusHomeHistoryAndOpenDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StatusHomeHistoryActions.getNodeStatusHomeHistoryAndOpenDialog),
            map((action) => action.request),
            switchMap((request) =>
                from(
                    this.statusHomeHistoryService.getNodeStatusHistory().pipe(
                        map((response: any) =>
                            StatusHomeHistoryActions.loadStatusHomeHistorySuccess({
                                request,
                                response: {
                                    statusHomeHistory: {
                                        canRead: response.canRead,
                                        statusHomeHistory: response.statusHistory
                                    }
                                }
                            })
                        ),
                        catchError((errorResponse: HttpErrorResponse) => this.snackBarOrFullScreenError(errorResponse))
                    )
                )
            )
        )
    );

    loadStatusHomeHistorySuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StatusHomeHistoryActions.loadStatusHomeHistorySuccess),
            map((action) => action.request),
            switchMap((request) => of(StatusHomeHistoryActions.openStatusHomeHistoryDialog({ request })))
        )
    );

    openStatusHomeHistoryDialog$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(StatusHomeHistoryActions.openStatusHomeHistoryDialog),
                map((action) => action.request),
                tap((request) => {
                    console.log('>>>>>>>>>>requeset', request);
                    // const dialogReference = this.dialog.open(HomeHistory, {
                    //     maxHeight: 'unset',
                    //     maxWidth: 'unset',
                    //     data: request,
                    //     autoFocus: 'dialog'
                    // });

                    // dialogReference.afterClosed().subscribe((response) => {
                    //     if (response !== 'ROUTED') {
                    //         if ('componentType' in request) {
                    //             this.store.dispatch(
                    //                 StatusHomeHistoryActions.viewStatusHomeHistoryComplete({
                    //                     request: {
                    //                         source: request.source,
                    //                         componentType: request.componentType,
                    //                         componentId: request.componentId
                    //                     }
                    //                 })
                    //             );
                    //         } else {
                    //             this.store.dispatch(
                    //                 StatusHomeHistoryActions.viewNodeStatusHomeHistoryComplete({
                    //                     request: {
                    //                         source: request.source
                    //                     }
                    //                 })
                    //             );
                    //         }
                    //     }
                    // });
                })
            ),
        { dispatch: false }
    );

    statusHomeHistoryBannerError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StatusHomeHistoryActions.statusHomeHistoryBannerError),
            map((action) => action.error),
            switchMap((error) => of(ErrorActions.addBannerError({ error })))
        )
    );

    private bannerOrFullScreenError(errorResponse: HttpErrorResponse) {
        if (this.errorHelper.showErrorInContext(errorResponse.status)) {
            const error = this.errorHelper.getErrorString(errorResponse, 'Failed to reload StatusHome History.');

            return of(StatusHomeHistoryActions.statusHomeHistoryBannerError({ error }));
        } else {
            return of(this.errorHelper.fullScreenError(errorResponse));
        }
    }

    private snackBarOrFullScreenError(errorResponse: HttpErrorResponse) {
        if (this.errorHelper.showErrorInContext(errorResponse.status)) {
            const error = this.errorHelper.getErrorString(errorResponse, 'Failed to load StatusHome History.');
            return of(ErrorActions.snackBarError({ error }));
        } else {
            return of(this.errorHelper.fullScreenError(errorResponse));
        }
    }
}
