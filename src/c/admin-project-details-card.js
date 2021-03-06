/**
 * window.c.AdminProjectDetailsCard component
 * render an box with some project statistics info
 *
 * Example:
 * m.component(c.AdminProjectDetailsCard, {
 *     resource: projectDetail Object,
 * })
 */
window.c.AdminProjectDetailsCard = ((m, h, moment) => {
    return {
        controller: (args) => {
            let project = args.resource,
                generateStatusText = () => {
                    let statusTextObj = m.prop({}),
                        statusText = {
                            online: {
                                cssClass: 'text-success',
                                text: 'EN COURS'
                            },
                            successful: {
                                cssClass: 'text-success',
                                text: 'FINANCE'
                            },
                            failed: {
                                cssClass: 'text-error',
                                text: 'NON FINANCE'
                            },
                            waiting_funds: {
                                cssClass: 'text-waiting',
                                text: 'EN COURS DE VALIDATION'
                            },
                            rejected: {
                                cssClass: 'text-error',
                                text: 'REFUSE'
                            },
                            draft: {
                                cssClass: '',
                                text: 'PROJET'
                            },
                            in_analysis: {
                                cssClass: '',
                                text: 'EN COURS'
                            },
                            approved: {
                                cssClass: 'text-success',
                                text: 'APPROUVE'
                            }
                        };

                    statusTextObj(statusText[project.state]);

                    return statusTextObj;
                },
                isFinalLap = () => {
                    // @TODO: use 8 days because timezone on js
                    return !_.isNull(project.expires_at) && moment().add(8, 'days') >= moment(project.zone_expires_at);
                };
            return {
                project: project,
                statusTextObj: generateStatusText(),
                remainingTextObj: h.translatedTime(project.remaining_time),
                elapsedTextObj: h.translatedTime(project.elapsed_time),
                isFinalLap: isFinalLap
            };
        },

        view: (ctrl) => {
            let project = ctrl.project,
                progress = project.progress.toFixed(2),
                statusTextObj = ctrl.statusTextObj(),
                remainingTextObj = ctrl.remainingTextObj,
                elapsedTextObj = ctrl.elapsedTextObj;

            return m('.project-details-card.card.u-radius.card-terciary.u-marginbottom-20', [
                m('div', [
                    m('.fontsize-small.fontweight-semibold', [
                        m('span.fontcolor-secondary', 'Status:'), ' ',
                        m('span', {
                            class: statusTextObj.cssClass
                        }, (ctrl.isFinalLap() && project.open_for_contributions ? 'Dernière ligne droite' : statusTextObj.text)), ' '
                    ]), (() => {
                        if (project.is_published) {
                            return [
                                m('.meter.u-margintop-20.u-marginbottom-10', [
                                    m('.meter-fill', {
                                        style: {
                                            width: (progress > 100 ? 100 : progress) + '%'
                                        }
                                    })
                                ]),
                                m('.w-row', [
                                    m('.w-col.w-col-3.w-col-small-3.w-col-tiny-6', [
                                        m('.fontcolor-secondary.lineheight-tighter.fontsize-small', 'Financé'),
                                        m('.fontweight-semibold.fontsize-large.lineheight-tight', progress + '%')
                                    ]),
                                    m('.w-col.w-col-3.w-col-small-3.w-col-tiny-6', [
                                        m('.fontcolor-secondary.lineheight-tighter.fontsize-small', 'relevé'),
                                        m('.fontweight-semibold.fontsize-large.lineheight-tight', [
                                            'R€ ' + h.formatNumber(project.pledged, 2),
                                        ]),
                                    ]),
                                    m('.w-col.w-col-3.w-col-small-3.w-col-tiny-6', [
                                        m('.fontcolor-secondary.lineheight-tighter.fontsize-small', 'Soutien'),
                                        m('.fontweight-semibold.fontsize-large.lineheight-tight', project.total_contributions)
                                    ]),
                                    m('.w-col.w-col-3.w-col-small-3.w-col-tiny-6', [
                                        (_.isNull(project.expires_at) ? [
                                            m('.fontcolor-secondary.lineheight-tighter.fontsize-small', 'Commencé'),
                                            m('.fontweight-semibold.fontsize-large.lineheight-tight', elapsedTextObj.total + ' ' + elapsedTextObj.unit)
                                        ] : [
                                             m('.fontcolor-secondary.lineheight-tighter.fontsize-small', 'restant'),
                                             m('.fontweight-semibold.fontsize-large.lineheight-tight', remainingTextObj.total + ' ' + remainingTextObj.unit)
                                         ])
                                    ])
                                ])
                            ];
                        }
                        return [];
                    }())
                ])
            ]);
        }
    };
}(window.m, window.c.h, window.moment));
