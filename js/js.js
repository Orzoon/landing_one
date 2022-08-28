
window.addEventListener("load", () => {
    let finished = false;
    /*****MASTER TIMELINE ******/
    const MI = gsap.timeline({
        onComplete: () => {finished = true}
    })
    MI.pause();
    init();

    function init(){
        // registering gsap
        gsap.registerPlugin(ScrollTrigger);
        //variables
        const header = document.querySelector(".Header");

        // rightProgressVars
        const allCont_wrapper = document.querySelector(".allCont_wrapper");
        const H_rightProgress = document.querySelector(".H_rightProgress");


        /**************************/
        // cammon_Cat_container //
        /**************************/
        let offSetToMove = window.getComputedStyle(document.querySelector(".allCont_wrapper")).marginTop;
        const p = gsap.utils.selector(allCont_wrapper);
        const commonCardArray = p(".commonCard");
    
        // headings vars
        const heading_cardArr = document.querySelectorAll(".heading_card");
        const heading_conArr = document.querySelectorAll(".common_HeadingCon")


        // catScroll vars
        // const catScrollArr = document.querySelectorAll(".catScrollList");
        // const common_cat_conSectionArr = document.querySelectorAll(".common_cat_conSection");



        /** helperFunction **/
        function startEnd(index, type){
            const windowSize = window.innerWidth;
            let startPos =  " ";
            let endPos = "bottom " + (window.getComputedStyle(header).height);
            if(windowSize >= 1024 && (index+1) % 2 === 0){
                startPos = "top 150%"
            }
            else if(windowSize >= 1024 && (index+1) %2 != 0){
                sartPos = "top 100%"
            }

            else{
                startPos = "top 150%"
            }

            if(type === "start"){
                return startPos
            }
            else {
                return endPos
            }
        }

        function yPos(index){
            const windowSize = window.innerWidth;
            //card setMarginFromCss --- getting new values on resize
            offSetToMove = window.getComputedStyle(document.querySelector(".allCont_wrapper")).marginTop;
            commonCardArray[index].style.top = offSetToMove;

            let ypos;

            if(windowSize >= 1024 && (index+1) % 2 === 0){
            ypos = -parseInt(offSetToMove, 10)* 1.3
            }
            else if(windowSize >= 1024 && (index+1) %2 != 0){
                ypos = -parseInt(offSetToMove, 10)/1.5
            }

            else{
                ypos = -parseInt(offSetToMove, 10)
            }

            return ypos;
        }
        /***CommonCardArray***/
        commonCardArray.forEach((card, index) => {

                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: () => startEnd(index, "start"),
                        end: () => startEnd(index, "end"),
                        scrub: 1,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                    y: () => yPos(index)
                })
        })

        heading_conArr.forEach((headingCard, index) => {
            gsap.to(headingCard, {
                scrollTrigger: {
                    trigger: heading_cardArr[index],
                    endTrigger: heading_cardArr[index],
                    start:"top bottom",
                    end:"bottom top",
                    scrub: true,
                    //markers: true,
                    invalidateOnRefresh: true
                },
                y : () => parseInt(window.getComputedStyle(heading_cardArr[index]).height, 10)/1.5
            })
        })

        /****IMAGE-CARD******/
        const imageArr = document.querySelectorAll(".imageCon img")
        
        imageArr.forEach((image, index) => {

            let t1 = gsap.timeline({duration: 0.5, delay: 0})
            t1.pause();
            let t2 = gsap.timeline({duration: 0.5, delay: 0})
            t2.pause();
            t1.to(image, {
                filter: "grayscale(20%)"
            })

            t2.to(image, {
                filter: "grayscale(100%)"
            })

            ScrollTrigger.create({
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => {t1.play();},
                onLeave: () => {t2.play()},
                onEnterBack: () => {t2.reverse()},
                onLeaveBack: () => {t1.reverse()},
            })
        })

        // /***catScrollArr***/
        // catScrollArr.forEach((scrollList, index) => {

        //     const enterOptions = {
        //         top: "0%",
        //         duration: 0.5
        //     }
        //     const leaveOptions = {
        //         top: "-100%",
        //         duration: 0.5
        //     }

        //     let enter = gsap.timeline({})
        //     enter.pause()
        //     let leave = gsap.timeline({})
        //     leave.pause();




        //     enter.to(scrollList, {
        //         ...enterOptions
        //     })

        //     leave.to(scrollList,{
        //         ...leaveOptions
        //     })

        //     ScrollTrigger.create({
        //         trigger: common_cat_conSectionArr[index],
        //         start: "top center",
        //         end: "bottom center",
        //         markers: true,
        //         onEnter: () => {enter.play()},
        //         onLeave: () => (leave.play()),
        //         onEnterBack: () => {leave.reverse()},
        //         onLeaveBack: () => {enter.reverse()},
        //         invalidateOnRefresh: true
        //     })

        // })

        /***VerticalScrollRightSide***/
        gsap.to(H_rightProgress, {
            scrollTrigger: {
                trigger: allCont_wrapper,
                start: () => "top " + window.getComputedStyle(header).height,
                end: "bottom bottom",
                scrub: 1
            },
            yPercent: 100,
            invalidateOnRefresh: true
            
        })


        /***************************/
        /**NAVIGATION**/
        //---> vars
        const navOpenBtn = document.querySelector(".H_rightCon");
        const navCloseBtn = document.querySelector("button.closeBtn");


        let gNavOpen = gsap.timeline({
            onComplete: () => navMasterTimeline.play(),
            onReverseComplete: () => {
                navMasterTimeline.progress(0).pause();
                innerCircle.progress(0).pause();
            }
        });
        gNavOpen.pause();
        let innerCircle = gsap.timeline({});
        gNavOpen
            .to(".navMainContainer", {
                display: "grid",
                duration: 0,
                delay: 0
            })
            .to(".navMainContainer", {
                duration: 0.6,
                left: "0%", 
                ease: "circ.inOut"
            })
        
        innerCircle
        .from(".navInnerCircle", {
            left: 160,
            ease: "power2.inOut",
            duration: 1.5
        })
        innerCircle.pause();

        navOpenBtn.addEventListener("click",() => {
            gNavOpen.play();
            innerCircle.play();
        })

        navCloseBtn.addEventListener("click", () => {
            gNavOpen.reverse();
        })

        /***Nav_link_animations***/
        let listTimelineArr = []; // StroginTimes ;
        const navListArray = document.querySelectorAll(".navList");
        navListArray.forEach((navList, index) => {
            const parent = gsap.utils.selector(navList);

            let t1 = gsap.timeline({})
            //t1.pause();
            t1.from(parent(".navNumP"), {
                top: "-100%",
                opacity: 0,
                duration: 1,
                delay: index* 0.2,
                ease: "sine.inOut"
            })
            .from(parent(".navP"), {
                top: "100%",
                opacity: 0,
                duration: 1,
                ease: "sine.inOut"
            }, "<0.4")

            listTimelineArr.push(t1)
        })

        // bot footer;
        const navFooter = document.querySelector(" .navFooter ");
        const fParent = gsap.utils.selector(navFooter);
        const fTimeline = gsap.timeline({})
        //const fTiimeline
        fTimeline
            .from(fParent(".flineFix"), {
                width: "0%",
                duration: 0.6,
                ease: "sine.inOut"
            })
            .from(fParent(".firstPFooter"), {
                duration: 0.8,
                top: "80%",
                opacity: 0,
                ease: "sine.inOut"
            }, "<0.5")
            .from(fParent(".lastPFooter"), {
                duration: 0.8,
                top: "-80%",
                opacity: 0,
                ease: "sine.inOut"
            }, "<0.3")
            // closebtn
            .from("button.closeBtn", {
                opacity: 0,
                rotate: 300,
                right: -75,
                duration: 1.5,
                ease: "sine.inOut"
            }, "<-0.1")
        

        const navMasterTimeline = gsap.timeline({})


        // list apprearance
        listTimelineArr.forEach((listTimeline, index) => {
            navMasterTimeline.add(listTimeline, "<")
        })

        // adding footer
        navMasterTimeline.add(fTimeline, "<1")
        
        navMasterTimeline.pause();

        /***************************/
        /**SPLASH**/

        //---> splash vars
        const logoPArr = document.querySelectorAll(".logoP");
        
        /*** timelineArrays ***/
        const splashTimelineArr = [];



        //-----> for the first logo
        const TlogoP = gsap.timeline({})
        .from(".logoP", {
            duration: 0.5,
            top: "100%",
            stagger: 0.2
        })

        const Tmidhead = gsap.timeline({})
        .from(".textMid", {
            duration: 0.6,
            top: "100%",
            stagger: 0.2
        })

        const TmenuLine = gsap.timeline({})
        .from(".menuLine", {
            width: 0,
            duration: 0.5,
            stagger: 0.2
        })

        const Tvp = gsap.timeline({})
        .from(".H_rightProgressInit", {
            duration: 0.6,
            top: "0%"
        })

        const TcCard = gsap.timeline({})
        .to('.cCardinit', {
            top: "0%",
            duration: 0.8,
            ease: "power3.inOut"
        })
        .to(["img", ".cardDescriptionCon"], {
            opacity: 1,
            duration: 0
        })
        .to(".cCardinit", {
            top: "100%",
            duration: 0.6,
            ease: "circ.inOut"
        })
        // text
        .from(".initCardTitle", {
            left: "-100%",
            duration: 1.2,
        }, "<0.4")


        const THeadingText = gsap.timeline({})
        .from(".initCatH", {
            top:"100%",
            duration: 0.6
        })
        .from(".initCatH2", {
            top: "100%",
            duration: 0.8,
            ease: "ease-in-out"
        }, "<0.2")

        const TlineHeading = gsap.timeline({})
        .from(".HeaderBorderLine", {
            width: "0%",
            duration: 0.8,
            delay: 0.3,
            ease: "circ.inOut"
        })

        /*****Heading Sub Timeline ******/
        const headingSub = gsap.timeline({})
        headingSub.add(TlogoP)
        headingSub.add(Tmidhead, "<0.2")
        headingSub.add(TmenuLine, "<0.2")
        MI.add(TlineHeading)
        MI.add(Tvp, ">-0.3")
        MI.add(headingSub, "> -0.8")
        MI.add(TcCard, ">-1")
        MI.add(THeadingText, ">-1");


        function navListeners(){
           const navListArray = document.querySelectorAll(".navList");
           const common_cat_conSection = document.querySelectorAll(".common_cat_conSection");
           
           navListArray.forEach((list,i) => {
                if(i ===3) {return null}

                
                list.addEventListener("click", (e) => {
                    gNavOpen.reverse();
                    setTimeout(() => {
                        if(i===0){
                            window.scrollTo(0,0)
                        }
                        else {
                            common_cat_conSection[i].scrollIntoView();
                        }
                    }, 400)
                })  
           })
        }

        navListeners();
    }

    function initialLoader(){
        let L = gsap.timeline({
            onComplete: () => {
                MI.play()
                setTimeout(() => {
                    catSet();
                },400)
            }
        })
        .to(".loader2", {
            top: "0vh",
            duration: 0.6,
            ease: "circ.out",
            delay: 0.5
        })
        .to(".loader2", {
            top: "-110vh",
            duration: 0.6,
            ease: "circ.out",
            delay: 0.1
        })
        .to(".loader1", {
            top: "-110vh",
            duration: 0.6,
            ease: "circ.out",
            delay: 0.1
        }, "<")

    }

    function catSet(){
        // catScroll vars
        const catScrollArr = document.querySelectorAll(".catScrollList");
        const common_cat_conSectionArr = document.querySelectorAll(".common_cat_conSection");
        /***catScrollArr***/
        catScrollArr.forEach((scrollList, index) => {

            const enterOptions = {
                top: "0%",
                duration: 0.5
            }
            const leaveOptions = {
                top: "-100%",
                duration: 0.5
            }

            let enter = gsap.timeline({})
            enter.pause()
            let leave = gsap.timeline({})
            leave.pause();




            enter.to(scrollList, {
                ...enterOptions
            })

            leave.to(scrollList,{
                ...leaveOptions
            })

            ScrollTrigger.create({
                trigger: common_cat_conSectionArr[index],
                start: "top center",
                end: "bottom center",
                onEnter: () => {enter.play()},
                onLeave: () => (leave.play()),
                onEnterBack: () => {leave.reverse()},
                onLeaveBack: () => {enter.reverse()},
                invalidateOnRefresh: true
            })

        })
    }
    initialLoader()

    setTimeout(() => {
        gsap.to(".commonCard", {
            pointerEvents: "auto"
        })
    }, 5000)
})

