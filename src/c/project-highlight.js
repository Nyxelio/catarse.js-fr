window.c.ProjectHighlight = ((m, _, h, c) => {
    return {
        controller: () => {
            var displayShareBox = h.toggleProp(false, true);

            return {
                displayShareBox: displayShareBox
            };
        },
        view: (ctrl, args) => {
            const project = args.project,
                address = project().address || {state_acronym: '', city: ''};

            return m('#project-highlight', [
                (project().video_embed_url ? m('.w-embed.w-video.project-video', {
                    style: 'min-height: 240px;'
                }, [
                    m('iframe.embedly-embed[itemprop="video"][src="' + project().video_embed_url + '"][frameborder="0"][allowFullScreen]')
                ]) : m('.project-image', {
                    style: 'background-image:url(' + project().original_image + ');'
                })),
                m('.project-blurb', project().headline),
                m('.u-text-center-small-only.u-marginbottom-30', [
                    (!_.isNull(address) ?
                     m(`a.btn.btn-inline.btn-small.btn-transparent.link-hidden-light.u-marginbottom-10[href="/fr/explore?pg_search=${address.state_acronym}"]`, [
                            m('span.fa.fa-map-marker'), ` ${address.city}, ${address.state_acronym}`
                        ]) : ''
                    ),
                    m(`a.btn.btn-inline.btn-small.btn-transparent.link-hidden-light[href="/fr/explore#by_category_id/${project.category_id}"]`, [
                        m('span.fa.fa-tag'), ' ',
                        project().category_name
                    ]),
                    m('button#share-box.btn.btn-small.btn-terciary.btn-inline', {
                        onclick: ctrl.displayShareBox.toggle
                    }, 'Partager'), (ctrl.displayShareBox() ? m.component(c.ProjectShareBox, {
                        project: project,
                        displayShareBox: ctrl.displayShareBox
                    }) : '')
                ])
            ]);
        }
    };
}(window.m, window._, window.c.h, window.c));
