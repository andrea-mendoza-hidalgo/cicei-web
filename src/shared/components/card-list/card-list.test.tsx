import React from 'react';
import { mount } from 'enzyme';
import '../../../i18n';
import CardsList from './card-list';
import { MemoryRouter } from 'react-router-dom';

const fakeNews = [
  {
    _id: 'j34h5jg3h242kh1',
    date: '2010/01/01',
    resume:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus varius velit, sed efficitur erat. Etiam finibus nunc metus, ac sodales diam molestie in. Nam commodo sollicitudin turpis nec egestas. Vestibulum vitae mauris nulla. Nullam ultricies ultricies dapibus. Suspendisse et lacinia turpis. Integer tincidunt molestie porta. Morbi sed arcu efficitur eros eleifend facilisis. Nunc sit amet augue in lorem dapibus fermentum. Integer at enim id sapien ultricies pharetra ac nec felis. Sed semper risus et vehicula vestibulum. Vestibulum leo turpis, luctus id interdum eget, consectetur ac diam. Donec condimentum libero sed ex eleifend dictum.Mauris ac cursus ex. Vestibulum eu ante risus. Curabitur sit amet ante dolor. Praesent cursus, diam ac imperdiet feugiat, enim tellus elementum enim, sed viverra elit enim at dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in consequat purus. Donec odio massa, ullamcorper id tortor in, finibus mollis lacus. Maecenas a sem nisl.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla fermentum tincidunt mi, non lobortis ligula tincidunt eget. Vivamus elit massa, commodo a tellus id, vulputate finibus sapien. Cras at justo nec odio tempus commodo sed a enim. Maecenas semper enim ut dui sodales, eget imperdiet ante consectetur. Maecenas eleifend dolor ut imperdiet vulputate. Fusce non euismod nisi, nec gravida est. Aenean ac purus ornare, dictum arcu non, porta augue. Mauris hendrerit, libero sagittis congue venenatis, tellus mauris rhoncus felis, id efficitur sapien lectus in ligula. Praesent condimentum ipsum a tortor egestas, id semper nulla sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac dolor ut arcu lacinia imperdiet. Ut aliquet eget ex et porta. Donec dapibus augue eu elementum maximus.',
    title: 'Lorem ipsum dolor sit amet',
    userOwner: '5f0eaa11af6d10604f49f166'
  },
  {
    _id: 'j34h5jg3h242kh1',
    date: '2010/01/01',
    title: 'Lorem ipsum dolor sit amet',
    resume:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus varius velit, sed efficitur erat. Etiam finibus nunc metus, ac sodales diam molestie in. Nam commodo sollicitudin turpis nec egestas. Vestibulum vitae mauris nulla. Nullam ultricies ultricies dapibus. Suspendisse et lacinia turpis. Integer tincidunt molestie porta. Morbi sed arcu efficitur eros eleifend facilisis. Nunc sit amet augue in lorem dapibus fermentum. Integer at enim id sapien ultricies pharetra ac nec felis. Sed semper risus et vehicula vestibulum. Vestibulum leo turpis, luctus id interdum eget, consectetur ac diam. Donec condimentum libero sed ex eleifend dictum.Mauris ac cursus ex. Vestibulum eu ante risus. Curabitur sit amet ante dolor. Praesent cursus, diam ac imperdiet feugiat, enim tellus elementum enim, sed viverra elit enim at dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in consequat purus. Donec odio massa, ullamcorper id tortor in, finibus mollis lacus. Maecenas a sem nisl.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla fermentum tincidunt mi, non lobortis ligula tincidunt eget. Vivamus elit massa, commodo a tellus id, vulputate finibus sapien. Cras at justo nec odio tempus commodo sed a enim. Maecenas semper enim ut dui sodales, eget imperdiet ante consectetur. Maecenas eleifend dolor ut imperdiet vulputate. Fusce non euismod nisi, nec gravida est. Aenean ac purus ornare, dictum arcu non, porta augue. Mauris hendrerit, libero sagittis congue venenatis, tellus mauris rhoncus felis, id efficitur sapien lectus in ligula. Praesent condimentum ipsum a tortor egestas, id semper nulla sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac dolor ut arcu lacinia imperdiet. Ut aliquet eget ex et porta. Donec dapibus augue eu elementum maximus.',
    userOwner: '5f0eaa11af6d10604f49f166'
  },
  {
    _id: 'j34h5jg3h242kh1',
    date: '2010/01/01',
    title: 'Lorem ipsum dolor sit amet',
    resume:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus varius velit, sed efficitur erat. Etiam finibus nunc metus, ac sodales diam molestie in. Nam commodo sollicitudin turpis nec egestas. Vestibulum vitae mauris nulla. Nullam ultricies ultricies dapibus. Suspendisse et lacinia turpis. Integer tincidunt molestie porta. Morbi sed arcu efficitur eros eleifend facilisis. Nunc sit amet augue in lorem dapibus fermentum. Integer at enim id sapien ultricies pharetra ac nec felis. Sed semper risus et vehicula vestibulum. Vestibulum leo turpis, luctus id interdum eget, consectetur ac diam. Donec condimentum libero sed ex eleifend dictum.Mauris ac cursus ex. Vestibulum eu ante risus. Curabitur sit amet ante dolor. Praesent cursus, diam ac imperdiet feugiat, enim tellus elementum enim, sed viverra elit enim at dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in consequat purus. Donec odio massa, ullamcorper id tortor in, finibus mollis lacus. Maecenas a sem nisl.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla fermentum tincidunt mi, non lobortis ligula tincidunt eget. Vivamus elit massa, commodo a tellus id, vulputate finibus sapien. Cras at justo nec odio tempus commodo sed a enim. Maecenas semper enim ut dui sodales, eget imperdiet ante consectetur. Maecenas eleifend dolor ut imperdiet vulputate. Fusce non euismod nisi, nec gravida est. Aenean ac purus ornare, dictum arcu non, porta augue. Mauris hendrerit, libero sagittis congue venenatis, tellus mauris rhoncus felis, id efficitur sapien lectus in ligula. Praesent condimentum ipsum a tortor egestas, id semper nulla sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac dolor ut arcu lacinia imperdiet. Ut aliquet eget ex et porta. Donec dapibus augue eu elementum maximus.',
    userOwner: '5f0eaa11af6d10604f49f166'
  }
];
describe('Card List Render Test', () => {
  it('CardList renders correctly ', () => {
    let card = mount(
      <MemoryRouter>
        <CardsList data={fakeNews} path={'/test'} emptyMessage={'empty'}/>{' '}
      </MemoryRouter>
    );
    expect(card).toMatchSnapshot();
  });

  it('Empty CardList renders correctly ', () => {
    let card = mount(
      <MemoryRouter>
        <CardsList data={[]} path={'/test'} emptyMessage={'empty'}/>{' '}
      </MemoryRouter>
    );
    expect(card).toMatchSnapshot();
  });
});
