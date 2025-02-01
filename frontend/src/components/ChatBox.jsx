import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { EllipsisVertical } from 'lucide-react';
import { Search } from 'lucide-react';
import { Phone } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';
import { Plus } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
const ChatBox = () => {
    return (
        <>
            <Card className="h-full m-0 rounded-none border-none bg-slate-800 p-0 ">
                <CardContent className="h-full px-0 pb-14  w-full">
                    <CardHeader className="bg-gray-950">
                        <div className="px-0 grid grid-cols-2 pt-1   ">
                            <div className="flex gap-3 justify-start ">
                                <div>q</div>
                                <h2>Name</h2>
                            </div>
                            <div className="flex  justify-end pt-0 ">
                                <Button className="bg-transparent hover:bg-slate-300 border-none rounded-full shadow-none">
                                    <Phone />
                                </Button>
                                <Button className="bg-transparent  hover:bg-slate-300 border-none rounded-full shadow-none">
                                    <Search />
                                </Button>
                                <Button className="bg-transparent hover:bg-slate-300 hover:rounded-xl border-none rounded-full shadow-none">
                                    <EllipsisVertical />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardDescription className="bg-slate-600 h-5/6">
                    <ScrollArea className='h-full'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam magnam laboriosam facilis beatae neque porro itaque in velit fuga distinctio, modi, placeat perferendis assumenda vel et sapiente, numquam corrupti iure.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae repellat a fuga minima, dolores cumque cupiditate ipsum. Eos, eaque. Laudantium doloremque voluptas a asperiores fugit error deleniti repudiandae sunt repellat minus, ex reprehenderit sit quod voluptate architecto. Libero deleniti dolore sit esse eum vel numquam, minima cum tempora, atque placeat quisquam, ad consequuntur ea sed dolorum! Excepturi magnam modi, pariatur deserunt tempora eum exercitationem voluptates, nisi consequatur rerum ea eius doloremque fugit commodi! Reiciendis veritatis neque delectus veniam inventore facere dolorum ex odio sed qui pariatur quam id voluptatibus, fugiat quaerat labore soluta nemo cumque earum temporibus porro architecto tempora! Numquam, velit doloremque. Cupiditate consequuntur ad commodi quos omnis sint in! Possimus sunt iure repellendus. Debitis ipsam a recusandae ipsum assumenda quasi ut vero. Sunt tempore quod ea enim libero eius eaque vel minima numquam eos dicta, temporibus explicabo quidem mollitia deleniti voluptatem sed laborum architecto. Eos quis, quam qui neque ea praesentium veritatis dolorum ab minus impedit? Tempora, dolores. Consectetur velit maxime unde doloremque atque, laborum voluptatibus modi similique autem dolor quam, tempora, error sint dignissimos illum tenetur fuga in! Deserunt tempore ipsum debitis dignissimos enim illum ea, quisquam culpa beatae quam voluptates. Sapiente numquam adipisci esse iure modi labore fugiat ab nostrum magnam tempora, quia, molestiae expedita. Vitae, non? Explicabo, velit placeat sapiente minima amet quasi pariatur saepe veniam cumque, non, quam odit. Tempora dignissimos fuga accusamus vitae quidem aspernatur blanditiis maxime quod reprehenderit excepturi beatae, officia, assumenda error praesentium nihil, quia est dolorum odit? Eius sequi aliquam similique qui doloremque odio quis necessitatibus autem eligendi quo eum veniam accusantium, neque consequatur doloribus, nemo soluta nam fugit? Cum, excepturi doloremque sapiente sed autem eos laboriosam fugiat beatae error ad veniam temporibus! Delectus reprehenderit officiis ipsam, soluta itaque saepe eligendi molestiae, necessitatibus facilis minima magnam quam quidem quo et iste corrupti aliquid excepturi sunt unde sit numquam dicta? Nemo perferendis repudiandae a esse, quia nobis cumque consequuntur ad explicabo voluptatum, quisquam fugit voluptates debitis enim possimus magni unde natus, voluptatibus voluptate! Laudantium quae enim minima dolore, fugit, illum, est dolores illo sint veniam blanditiis eos voluptas maiores aspernatur commodi eum architecto aut facere. Ducimus perferendis magni voluptas. Veritatis repellendus quo delectus possimus quisquam vero recusandae accusantium ipsa voluptatibus rerum sed est sequi eos hic aliquid eum id libero consequuntur consectetur voluptate quod, placeat deleniti! Deserunt mollitia dolorem molestias in voluptas corrupti amet repellendus cum natus est ex voluptatum quos esse dolore nesciunt pariatur assumenda, dolor enim, cumque reiciendis nulla soluta laudantium voluptate. Asperiores ratione repellat consequuntur eius placeat in eaque praesentium modi aspernatur doloremque, unde totam a autem ex! Dolorem similique qui vero perspiciatis laudantium, laboriosam tempore ab, id illo ratione doloremque neque dolore impedit dolorum et eaque enim earum velit ut cum reiciendis a inventore! Sapiente quia cumque blanditiis commodi sit eius obcaecati, placeat enim dolor nemo veniam possimus. Eveniet vel officia aut cupiditate, impedit laudantium cumque, dolor laboriosam illum atque, delectus obcaecati itaque provident officiis blanditiis optio repudiandae exercitationem incidunt aperiam eum necessitatibus quam. Itaque, neque rem?
                    </ScrollArea>
                  </CardDescription>

                    <CardFooter className="flex items-center justify-center gap-2   bg-gray-950 p-4 ">
                        {/* <div className='flex'> */}
                        <Button  className='bg-transparent hover:bg-slate-300 hover:rounded-xl border-none rounded-full shadow-none text-6xl'>
                        <Plus />
                        </Button>
                        
                        <Input className="h-10" />
                        <Button className="bg-white text-black hover:bg-green-700 hover:text-white ">
                            <SendHorizontal size={24} />
                        </Button>
                        {/* </div> */}
                    </CardFooter>
                </CardContent>
            </Card>
        </>
    );
};

export default ChatBox;
