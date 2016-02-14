window.c.ProjectRewardList = ((m, h, _) => {
    return {
        view: (ctrl, args) => {
            //FIXME: MISSING ADJUSTS
            // - add draft admin modifications
            var project = args.project;
            return m('#rewards.u-marginbottom-30', _.map(args.rewardDetails(), (reward) => {
                var contributionUrlWithReward = '/projects/' + project.id + '/contributions/new?reward_id=' + reward.id;

                return m('a[class="' + (h.rewardSouldOut(reward) ? 'card-gone' : 'card-reward ' + (project.open_for_contributions ? 'clickable' : '')) + ' card card-secondary u-marginbottom-10"][href="' + (project.open_for_contributions && !h.rewardSouldOut(reward) ? contributionUrlWithReward : 'js:void(0);') + '"]', [
                    m('.u-marginbottom-20', [
                        m('.fontsize-base.fontweight-semibold', 'Montant de ' + h.formatNumber(reward.minimum_value) + '€ ou plus'),
                        m('.fontsize-smaller.fontweight-semibold', h.pluralize(reward.paid_count, ' donateur', ' donateurs')), (reward.maximum_contributions > 0 ? [
                            (reward.waiting_payment_count > 0 ? m('.maximum_contributions.in_time_to_confirm.clearfix', [
                                m('.pending.fontsize-smallest.fontcolor-secondary', h.pluralize(reward.waiting_payment_count, ' apoio em prazo de confirmação', ' apoios em prazo de confirmação.'))
                            ]) : ''), (h.rewardSouldOut(reward) ? m('.u-margintop-10', [
                                m('span.badge.badge-gone.fontsize-smaller', 'Esgotada')
                            ]) : m('.u-margintop-10', [
                                m('span.badge.badge-attention.fontsize-smaller', [
                                    m('span.fontweight-bold', 'Offre limitée'),
                                    ' (' + h.rewardRemaning(reward) + ' sur ' + reward.maximum_contributions + ' disponíbles)'
                                ])
                            ]))
                        ] : ''),
                    ]),
                    m('.fontsize-smaller.u-margintop-20', m.trust(h.simpleFormat(reward.description))), (!_.isEmpty(reward.deliver_at) ?
                        m('.fontsize-smaller', [
                            m('b', 'Estimation de livraison: '),
                            h.momentify(reward.deliver_at, 'MMM/YYYY')
                        ]) : ''), (project.open_for_contributions && !h.rewardSouldOut(reward) ?
                        m('.project-reward-box-hover', [
                            m('.project-reward-box-select-text.u-text-center', 'Sélectionner cette récompense')
                        ]) : '')
                ]);
            }));
        }
    };
}(window.m, window.c.h, window._));
