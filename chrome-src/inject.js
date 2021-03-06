/*
;;;;;;;;;;;;;::;;:ldxdool:;;;;;;;;;;::;:llodxdc;clccc:::::;,;;::;,,,,,,,,,,,,,,,
;;;;;;;;;;;;:lccodo:,,;cdo:;;;;;;;;:clloxxo:,;c;'cdlcccc:;;;;;;;;;;;,,,,,,,,,,,,
::::::::::::;:lxo:;okko;:oo:;;;:::::cdkoc::dO0Xx;:docc::;;;;;;;;;;;;;;;;,,,,,,,,
:::::::::::::lxo,;xNMWXc.cdc:::::::cddc;cdKWMMW0c:doc:;;;;;;;;;;;;;;;;;;;;;;;;,,
:cllc:::::::lxd::ONMMMXl.:dl:::::::ldc'l0XWWMMNd,:dl::;;;;;;;;;;;;;;;;;;;;;;;;;,
,:oxxlllc:::ldc'lXWWMMXl':ddolcccc:ld::kXXXXWWXl.:doc:::;:::::;;;;;;;;;;;;;;;;;;
kd::c:cddl::ld:.lXXXXX0l';c:;:odolcldc,oO0KKXXk:.';;,;lc::::;::;;;:;;::;;;;;;;;;
NN0kkc':ddooddl;;dKNNOc;lOKko;,cddldx:':okXXOl;lxxkxc,,coooollc::::::::;;;;;;;;;
XX0Odc,,:;;;:llc,;xXNk:oOKWMNx,':llol;.:dk00o:dOKWWWNd',oxl;;;,:oc::::::;;;;;;;;
cc:;,;coddddkO0Oo,:dOx;;;oXMMKl;cc;;,'';ldkkl;ccxWWMMk,';:;cxkc:dl:::::::::;;;;;
coxOOOO00000K000kc,cxdlloxNWW0:;x0OOkc';ldO0kooONWWMWx''ckKNWWx:loc:::::::::::::
0000000000000000Kk:;ok0KK0KXXd';kK00Oc';ldxk0KKKXXXKd;,cONWWWWKo:do:::::::::::::
oO00000000000000Kk:':xxxkxdo:,:d000KOc':ldxdollool:,',lOXXKOxkKk:oo:::::::::::::
;lk0000000000000Kk:':dxol:,;cok0000KOc:odxkOo,,;:::cc;cdO0xc;:dd:odcc:::::::::::
d::x000000000000Kkc':dk00o:x0000000KOc;lox00l;dO00000kl;cl:co:ld:odccccc:::cccc:
kd;;oO000000000000d;;codd:;kK00000000o;,';c:,ckK0000000kl,,od:ld:oxlcccccccccc::
cxkl;oO000000000000xl;;,,:dO0000000000kdoooodk00000000000kl;;,co;cxdlccllcccc:::
;lOOolk00000000000000OkkkO0000000000000K00KK000000000000000xc,;:,,oxllllcccccc::
:oO000000000000000000000000000000000000000000000000000000000Oo,'''lxolcccccccccc
k000000000000000000000000000000000000000000000000000000000000Oxc''lxlcccccccccll
000000000000000000000000000K0KK0KKKK0KKKKKKKKKKKKK0000000000000kc,:ddlclllllllll
000000000000000000000OOkxxdddoooooooooooooooooooooooodxxOO000000kc,:ddoloollllll
0000000Oxl::::::::::::;;,:lll:''''''''''''''''''''''';lodl::::cxOOl;cxdooooooool
000000Kx;'''''''''''''',cOWWW0c,''''''''''''''''''',l0WWWd''''':O0Ol,:ddooooooll
000000Kx;''''''''''',,,;cOWWWk:''',;:c;''''''''',;,;dXWMNd'''';oO00k:,lxdoooooll
0000000Okddc'''''''',,;;;:ool:''':dk00kolc,''''',;;;,:ool;'''lk0000Kk;,oxdoooooo
00000000000kc,'''''''',,'''''''':x0000000Ol,'''''','''''''',ck000000Ol,cxdooooll
000000000000Ol,''''''''''''''',lO000000000Oo,'''''''''''''':kK0000000Oc:dxdolllc
0000000000000Od;''''''''''''';dO000000000000xc,'''''''''':ok00000000KOc'cxdlllll
000000000000000Oxxolc:::cloxxO0000000000000000kxxxxxxxxxxO00000000000Ol,:ddlllll
0000000000000000000000000000000O000OO000000000000000000000000000000000k::ddlllll
00000000000000000000000000000Oocodc;:odl::cdllOK00000000000K00000000000l:ddlllll
000000000000000000000000000000Odclodo::odoc:cdO000000000000000000000000l:ddlllll
0000000000000000000000000000000000000OO0K00O000000000000000000000000K0k::ddooooo
00000000000000000000000000000000000000000000000000000000000000000000KOl,:xdoooll
000000000000000000000000000000000000000000000000000000000000000000000Oc;dxdollll
000000000000000000000000000000000000000000000000000000000000000000000d;cxdoollll
00000000000000000000000000000000000000000000000000000000000000000000x:;oxdoolloo
0000000000000000000000000000000000000000000000000000000000000000000x:;oxdddolooo
000000000000000000000000000000000000000000000000000000000000000000xc;lxdodoollll
**/
let observer = null;

chrome.storage.local.get("fanciness", ({ fanciness }) => {
  observe(fanciness);
});

chrome.runtime.onMessage.addListener(({ fanciness }) => {
  if (observer instanceof MutationObserver) {
    observer.disconnect();
  }
  observe(fanciness);
});

function observe(fanciness) {
  observer = new MutationObserver(throttle(500, shine, [fanciness]));
  observer.observe(document, { subtree: true, childList: true });
}

function shine(fanciness) {
  const re = new RegExp("<(color=)?(#(?:[0-9a-fA-F]{3}){1,2})", "g");
  // target headers tags and users blue ronin links
  Array.from(
    document.querySelectorAll(
      'h2, h3, h4, h5, a[class^="text-primary-4"][href^="/profile/ronin:"] span'
    )
  )
    .map((node) => {
      const isNodeSiblingToEditButton =
        node.nextElementSibling?.firstChild?.firstChild
          ?.getAttribute("d")
          // target using svg path
          ?.startsWith("M11.183");

      // if username close to edit button
      if (isNodeSiblingToEditButton) {
        const parent = node.parentElement;

        if (parent) {
          // display this button below to prevent accessiblity issue with potential long name.
          parent.style.flexDirection = "column";
          // display it completely
          parent.classList.remove("truncate");
        }
      }

      // display name without dots
      node.classList.remove("truncate");
      // display name above users addresses blocks on ronin profile page
      node.style.cssText += "position:relative;";
      return node;
    })
    // keep only headers styled with color tag
    .filter((node) => node.innerText.match(re))
    // replace the header content with the styled HTML
    .forEach(
      (node) =>
        (node.innerHTML = fanciness
          ? shiningNameToHtmlString(node.innerText)
          : removeUnityTags(node.innerText))
    );
}

function removeUnityTags(name) {
  return (
    name
      // remove color tags
      .replace(/<(color=)?(#(?:[0-9a-fA-F]{3}){1,2})>/g, "")
      // remove size tags
      .replace(/<(size=)?\d+>/g, "")
      // remove enclosing tags
      .replace(/<\/(color|size)?>/g, "")
  );
}

function shiningNameToHtmlString(name) {
  const enclosingSpan = "</span>";
  const re = new RegExp("<(color=)?(#(?:[0-9a-fA-F]{3}){1,2})>", "g");
  const count = (name.match(re) || []).length;

  return (
    "<span>" +
    name
      // replace hex tags with styled span tags
      .replace(re, `<span style='color:${"$2"};'>`)
      // remove size tags
      .replace(/<(size=)?\d+>/g, "")
      // remove enclosing tags
      .replace(/<\/(color|size)?>/g, "")
      // append enclosing span tags
      .concat(enclosingSpan.repeat(count)) +
    "</span>"
  );
}

function throttle(limit, callback, args) {
  let wait = false; // Initially, we're not waiting
  return function () {
    // We return a throttled function
    if (!wait) {
      // If we're not waiting
      callback.apply(null, args); // Execute users function
      wait = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        wait = false; // And allow future invocations
      }, limit);
    }
  };
}
